import LayoutViewOptions from "@/components/layout-view-options";
import PodcastCard from "@/components/podcast-card";
import PodcastGrid from "@/components/podcast-grid";
import PodcastsResultSkeleton from "@/components/podcast-result-skeleton";
import Search from "@/components/search";
import { Podcast } from "@/types";
import { MicVocal } from "lucide-react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default function Home({ searchParams }: PageProps) {
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
        <Suspense fallback={null}>
          <Search />
        </Suspense>
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

  return (
    <div>
      <div className="flex mb-4  items-center justify-between border-b shadow-xs px-4 py-2 bg-background sticky z-10 top-17">
        <p className="text-sm text-gray-500">Top Podcasts for {q || "all"}</p>
        <LayoutViewOptions />
      </div>
      <PodcastGrid podcasts={response.data || []} />
    </div>
  );
}
