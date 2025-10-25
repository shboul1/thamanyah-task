import PodcastGrid from "@/components/podcast-grid";
import PodcastsResultSkeleton from "@/components/podcast-result-skeleton";
import Search from "@/components/search";
import { Podcast } from "@/types";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q || "";
  return (
    <div className="grid gap-0">
      <div className="flex items-center gap-2 sticky z-10 top-0 bg-background p-4">
        <Search />
      </div>
      <Suspense key={q} fallback={<PodcastsResultSkeleton />}>
        <PodcastsFetcher q={q} />
      </Suspense>
    </div>
  );
}

async function PodcastsFetcher({ q }: { q?: string }) {
  const podcasts = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/search?q=" + q
  );
  const response: {
    success: boolean;
    data?: Podcast[];
    resultCount?: number;
  } = await podcasts.json();

  if (!response.success) return <div>Something went Wrong.</div>;

  return <PodcastGrid q={q} podcasts={response.data || []} />;
}
