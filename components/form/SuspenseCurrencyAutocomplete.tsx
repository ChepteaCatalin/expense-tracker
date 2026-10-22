import { Suspense } from "react";
import CurrencyAutocomplete from "./CurrencyAutocomplete";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuspenseCurrencyAutocomplete({
  isEditMode,
}: {
  isEditMode?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-2">
          <Skeleton className="h-5 w-18.25" />
          <Skeleton className="h-8" />
        </div>
      }
    >
      <CurrencyAutocomplete isEditMode={isEditMode} />
    </Suspense>
  );
}
