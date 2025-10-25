import { cn } from "@/lib/utils";
import { Podcast } from "@/types";
import Image from "next/image";

export default function PodcastCard({
  podcast,
  layout,
}: {
  podcast: Podcast;
  layout?: string;
}) {
  return (
    <div
      key={podcast.trackId}
      className={cn("space-y-1", {
        "w-48 shrink-0": layout === "scroll",
      })}
    >
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Image
          src={podcast.artworkUrl600}
          alt={podcast.artistName}
          className="object-contain"
          fill
        />
      </div>
      <p className="truncate">{podcast.trackName}</p>
      <p className="truncate text-sm">{podcast.artistName}</p>
    </div>
  );
}
