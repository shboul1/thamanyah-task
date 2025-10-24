"use client";
import { Podcast } from "@/types";
import PodcastCard from "./podcast-card";
import { MicVocal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function PodcastGrid({ podcasts }: { podcasts: Podcast[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const layout = localStorage.getItem("layout") as "grid" | "scroll";

  return (
    <div
      className={cn("px-4 pb-10 gap-6", {
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4":
          layout === "grid",
        "overflow-scroll flex w-dvw md:w-[calc(100dvw-220px)]":
          layout === "scroll",
      })}
    >
      {podcasts && podcasts.length > 0 ? (
        podcasts?.map((podcast) => (
          <PodcastCard key={podcast.trackId} podcast={podcast} />
        ))
      ) : (
        <div className="col-span-4 text-muted-foreground flex-col gap-4 h-[500px] flex items-center justify-center">
          <MicVocal size={40} />
          Type in a search term to start.
        </div>
      )}
    </div>
  );
}
