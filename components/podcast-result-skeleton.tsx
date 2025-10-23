import { Skeleton } from "./ui/skeleton";

export default function PodcastsResultSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 px-4 pb-10">
      {Array.from({ length: 15 }).map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-[200px]" />
      ))}
    </div>
  );
}
