import { Skeleton } from "@/components/ui/skeleton";

export function TypeRadioGroupSkeleton() {
  return (
    <div>
      <Skeleton className="mb-1.5 h-5 w-8" />
      <Skeleton className="mb-2 h-5 w-20" />
      <Skeleton className="h-5 w-18" />
    </div>
  );
}
