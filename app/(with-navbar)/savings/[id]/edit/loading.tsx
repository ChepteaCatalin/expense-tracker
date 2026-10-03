import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditSavingsGoalPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-13" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-18.25" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-26" />
          <Skeleton className="h-8" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-27.5" />
          <Skeleton className="h-8" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-16.75" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-16 w-full" />
      </div>
      <Separator className="my-5" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}
