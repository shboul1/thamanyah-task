import LayoutViewOptions from "@/components/layout-view-options";
import PodcastCard from "@/components/podcast-card";
import PodcastsResultSkeleton from "@/components/podcast-result-skeleton";
import Search from "@/components/search";
import { Podcast } from "@/types";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q || "";
  return (
    <div className="grid gap-0">
      <div className="flex items-center gap-2 sticky z-10 top-0 bg-background p-4">
        <Search />
        <LayoutViewOptions />
      </div>
      <Suspense key={q} fallback={<PodcastsResultSkeleton />}>
        <PodcastsGrid q={q} />
      </Suspense>
    </div>
  );
}

async function PodcastsGrid({ q }: { q?: string }) {
  const podcasts = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/search?q=" + q
  );
  const response: {
    success: boolean;
    data?: Podcast[];
    resultCount?: number;
  } = await podcasts.json();

  if (!response.success) return <div>Something went Wrong.</div>;

  return (
    <div>
      <p className="mb-4 text-sm text-gray-500 sticky z-10 top-17 px-4 py-2 border-b shadow-xs bg-background">
        Top Podcasts for {q || "all"}
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 px-4 pb-10">
        {response.data?.map((podcast) => (
          <PodcastCard key={podcast.trackId} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
