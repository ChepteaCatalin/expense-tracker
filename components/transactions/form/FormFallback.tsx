import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormFallback({ isEditMode }: { isEditMode?: boolean }) {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="flex-1">
            <Skeleton className="mb-2 h-5 w-16.25" />
            <Skeleton className="h-8" />
          </div>
          <div className="flex-1">
            <Skeleton className="mb-2 h-5 w-7" />
            <Skeleton className="h-8" />
          </div>
        </div>
        <div>
          <Skeleton className="mb-2 h-5 w-17" />
          <Skeleton className="aspect-video" />
        </div>
        <div>
          <Skeleton className="mb-2 h-5 w-16.25" />
          <Skeleton className="h-16" />
        </div>
        <Separator className="mb-5" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        {isEditMode && <Skeleton className="h-8" />}
      </div>
    </div>
  );
}
