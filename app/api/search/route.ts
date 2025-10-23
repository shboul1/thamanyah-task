import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { searchCache } from "@/db/schema";
import { Podcast } from "@/types";

const ITUNES_API_URL = "https://itunes.apple.com/search?media=podcast&term=";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type ITunesResponse = {
  resultCount: number;
  results: Podcast[];
};

function normalize(q: string) {
  return q.trim().toLowerCase();
}

function isExpired(expiresAt: Date | string | null) {
  if (!expiresAt) return true;
  const ts = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  return ts.getTime() <= Date.now();
}

async function fetchITunes(q: string): Promise<ITunesResponse> {
  try {
    const resp = await fetch(ITUNES_API_URL + encodeURIComponent(q));
    const data = await resp.json();
    return data as ITunesResponse;
  } catch (error) {
    throw new Error("Failed to fetch from iTunes API");
  }
}

async function upsertCache(queryKey: string, payload: ITunesResponse) {
  const now = new Date();
  const exp = new Date(now.getTime() + ONE_DAY_MS);

  await db
    .insert(searchCache)
    .values({
      id: crypto.randomUUID(),
      queryKey,
      data: payload as any,
      expiresAt: exp,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: searchCache.queryKey,
      set: { data: payload as any, expiresAt: exp, updatedAt: now },
    });
}

async function revalidateInBackground(queryKey: string, term: string) {
  try {
    const fresh = await fetchITunes(term);
    await upsertCache(queryKey, fresh);
  } catch {}
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ success: true, data: [], resultCount: 0 });
  }
  const queryKey = normalize(q);

  const [cached] = await db
    .select()
    .from(searchCache)
    .where(eq(searchCache.queryKey, queryKey))
    .limit(1);

  if (!cached) {
    try {
      const data = await fetchITunes(q);
      await upsertCache(queryKey, data);
      return NextResponse.json({
        success: true,
        data: data.results,
        resultCount: data.resultCount,
        cache: "miss",
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error?.message || "Upstream Error" },
        { status: 502 }
      );
    }
  }

  if (isExpired(cached.expiresAt)) {
    revalidateInBackground(queryKey, q);

    const payload = cached.data as ITunesResponse | null;
    return NextResponse.json({
      success: true,
      data: payload?.results ?? [],
      resultCount: payload?.resultCount ?? 0,
      cache: "stale",
    });
  }

  const payload = cached.data as ITunesResponse | null;
  return NextResponse.json({
    success: true,
    data: payload?.results ?? [],
    resultCount: payload?.resultCount ?? 0,
    cache: "hit",
  });
}
