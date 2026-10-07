import { Suspense } from "react";
import { type TransactionByCategorySearchParams } from "@/types/transaction";
import OverviewSkeleton from "@/components/transactions/OverviewSkeleton";
import CategoryIncomesList from "./_components/CategoryIncomesList";
import Heading from "@/components/transactions/Heading";
import CategoryIncomesOverview from "./_components/CategoryIncomesOverview";
import CategoryTransactionsListFallback from "@/components/transactions/CategoryTransactionsListFallback";
import NewIncomeFab from "../../_components/NewIncomeFab";

export default function IncomesCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<TransactionByCategorySearchParams>;
}) {
  return (
    <div className="pb-6">
      <Heading type="incomes" />
      <Suspense fallback={<OverviewSkeleton />}>
        <CategoryIncomesOverview params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<CategoryTransactionsListFallback />}>
        <CategoryIncomesList params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense>
        <NewIncomeFab searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
