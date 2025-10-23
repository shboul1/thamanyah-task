import { iTunesResponse } from "@/types";
import type { NextRequest } from "next/server";

const ITUNES_API_URL = "https://itunes.apple.com/search?media=podcast&term=";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");
    if (!query) {
      return Response.json({ success: true, data: [] });
    }

    const iTunesResponse = await fetch(
      ITUNES_API_URL + encodeURIComponent(query)
    );
    const data: iTunesResponse = await iTunesResponse.json();

    return Response.json({
      success: true,
      data: data.results,
      resultCount: data.resultCount,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
