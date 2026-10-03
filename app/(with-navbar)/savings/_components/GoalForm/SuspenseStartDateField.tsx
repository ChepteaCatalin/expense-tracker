import { Suspense } from "react";
import StartDateField from "./StartDateField";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuspenseStartDateField({
  isEditMode,
}: {
  isEditMode?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-2">
          <Skeleton className="h-5 w-16.75" />
          <Skeleton className="h-8" />
        </div>
      }
    >
      <StartDateField isEditMode={isEditMode} />
    </Suspense>
  );
}
