import { Suspense } from "react";
import Box from "@mui/material/Box";
import CategoryExpensesList from "./_components/CategoryExpensesList";
import { type TransactionByCategorySearchParams } from "@/types/transaction";
import CategoryExpensesOverview from "./_components/CategoryExpensesOverview";
import Heading from "@/components/transactions/Heading";
import Skeleton from "@mui/material/Skeleton";
import CategoryTransactionsListFallback from "@/components/transactions/CategoryTransactionsListFallback";
import NewExpenseFab from "../../_components/NewExpenseFab";

export default function ExpensesCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<TransactionByCategorySearchParams>;
}) {
  return (
    <Box sx={{ pb: 3 }}>
      <Heading type="expenses" />
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
        <CategoryExpensesOverview params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<CategoryTransactionsListFallback />}>
        <CategoryExpensesList params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense>
        <NewExpenseFab searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}
