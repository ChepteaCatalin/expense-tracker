import { Suspense } from "react";
import Box from "@mui/material/Box";
import { type TransactionByCategorySearchParams } from "@/types/transaction";
import Skeleton from "@mui/material/Skeleton";
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
    <Box sx={{ pb: 3 }}>
      <Heading type="incomes" />
      <Suspense
        fallback={
          <Skeleton
            variant="rectangular"
            width="100%"
            height={209}
            sx={{ borderRadius: "12px" }}
          />
        }
      >
        <CategoryIncomesOverview params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<CategoryTransactionsListFallback />}>
        <CategoryIncomesList params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense>
        <NewIncomeFab searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}
