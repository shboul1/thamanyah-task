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
    <div className="container mx-auto grid gap-8 py-10">
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
    <div className="flex flex-nowrap  overflow-scroll">
      {response.data?.map((podcast) => (
        <div key={podcast.trackId}>
          <Image
            src={podcast.artworkUrl100}
            alt={podcast.artistName}
            width={400}
            height={400}
          />
          <p>{podcast.artistName}</p>
        </div>
      ))}
    </div>
  );
}
