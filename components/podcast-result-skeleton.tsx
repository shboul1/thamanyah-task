import { Skeleton } from "./ui/skeleton";

export default function PodcastsResultSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-4 pb-10">
      {Array.from({ length: 15 }).map((_, index) => (
        <Skeleton key={index} className="aspect-square" />
      ))}
    </div>
  );
}
