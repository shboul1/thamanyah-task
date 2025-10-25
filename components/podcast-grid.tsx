"use client";
import { Podcast } from "@/types";
import PodcastCard from "./podcast-card";
import { MicVocal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import LayoutViewOptions from "./layout-view-options";

export default function PodcastGrid({
  q,
  podcasts,
}: {
  q?: string;
  podcasts: Podcast[];
}) {
  const [layout, setLayout] = useState<"grid" | "scroll">("grid");
  return (
    <div>
      <div className="flex mb-4  items-center justify-between border-b shadow-xs px-4 py-2 bg-background sticky z-10 top-17">
        <p className="text-sm text-gray-500">Top Podcasts for {q || "all"}</p>
        <LayoutViewOptions value={layout} onValueChange={setLayout} />
      </div>
      <div
        className={cn("px-4 pb-10 gap-6", {
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5":
            layout === "grid",
          "overflow-scroll flex w-dvw md:w-[calc(100dvw-220px)]":
            layout === "scroll",
        })}
      >
        {podcasts && podcasts.length > 0 ? (
          podcasts?.map((podcast) => (
            <PodcastCard
              key={podcast.trackId}
              podcast={podcast}
              layout={layout}
            />
          ))
        ) : (
          <div className="col-span-4 text-muted-foreground flex-col gap-4 h-[500px] flex items-center justify-center">
            <MicVocal size={40} />
            Type in a search term to start.
          </div>
        )}
      </div>
    </div>
  );
}
