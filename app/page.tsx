import PodcastsResultSkeleton from "@/components/podcast-result-skeleton";
import Search from "@/components/search";
import { Podcast } from "@/types";
import Image from "next/image";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q || "";
  return (
    <div className="grid gap-4">
      <Search />
      <Suspense key={q} fallback={<PodcastsResultSkeleton />}>
        <PodcastsGrid q={q} />
      </Suspense>
    </div>
  );
}

async function PodcastsGrid({ q }: { q?: string }) {
  const podcasts = await fetch("http://localhost:3000/api/search?q=" + q);
  const response: {
    success: boolean;
    data?: Podcast[];
    resultCount?: number;
  } = await podcasts.json();

  if (!response.success) return <div>Something went Wrong.</div>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
      {response.data?.map((podcast) => (
        <div key={podcast.trackId} className="space-y-1">
          <Image
            src={podcast.artworkUrl600}
            alt={podcast.artistName}
            width={400}
            height={400}
          />
          <p>{podcast.trackName}</p>
          <p>{podcast.artistName}</p>
        </div>
      ))}
    </div>
  );
}
