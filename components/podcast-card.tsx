import { Podcast } from "@/types";
import Image from "next/image";

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <div key={podcast.trackId} className="space-y-1">
      <div className="relative min-w-[200px] aspect-square rounded-md overflow-hidden">
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
