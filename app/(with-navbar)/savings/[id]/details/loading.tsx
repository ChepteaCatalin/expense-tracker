import BackBtnSkeleton from "@/components/BackBtnSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavingsGoalDetailsLoading() {
  return (
    <div>
      <BackBtnSkeleton />
      <div className="flex flex-col gap-6">
        <Skeleton className="h-120 rounded-2xl lg:h-80" />
        <Skeleton className="h-25.5 rounded-2xl" />
        <Skeleton className="h-41.25 rounded-2xl" />
      </div>
    </div>
  );
}
