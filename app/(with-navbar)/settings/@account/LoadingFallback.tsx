import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFallback() {
  return (
    <div className="flex h-11 items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div>
        <Skeleton className="mb-2 h-4 w-32" />
        <Skeleton className="h-3.5 w-48" />
      </div>
    </div>
  );
}
