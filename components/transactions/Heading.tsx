import { Suspense } from "react";
import BackToCategoriesBtn from "@/components/transactions/BackToCategoriesBtn";
import SortBy from "@/components/transactions/SortBy";
import BackBtnSkeleton from "../BackBtnSkeleton";
import { Skeleton } from "../ui/skeleton";

export default function Heading({ type }: { type: "incomes" | "expenses" }) {
  return (
    <div className="mb-2.5 flex items-center justify-between">
      <Suspense fallback={<BackBtnSkeleton className="mb-0" />}>
        <BackToCategoriesBtn type={type} className="mb-0" />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-8 w-38" />}>
        <SortBy />
      </Suspense>
    </div>
  );
}
