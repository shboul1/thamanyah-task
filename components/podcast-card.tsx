import { Podcast } from "@/types";
import Image from "next/image";

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <div key={podcast.trackId} className="space-y-1">
      <Image
        src={podcast.artworkUrl600}
        alt={podcast.artistName}
        width={400}
        height={400}
        className="rounded-md"
      />
      <p className="truncate">{podcast.trackName}</p>
      <p className="truncate">{podcast.artistName}</p>
    </div>
  );
}
