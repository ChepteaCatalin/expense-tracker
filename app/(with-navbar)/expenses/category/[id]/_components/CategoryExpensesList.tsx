import type { TransactionsByDate } from "@/types/transaction";
import {
  type SortTransactionBy,
  type TransactionByCategorySearchParams,
} from "@/types/transaction";
import { UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import { getExpensesByCategory } from "@/data/expense";
import {
  dateFromSearchParams,
  notFoundOnInvalidParams,
} from "@/utils/transactions/url";
import Stack from "@mui/material/Stack";
import PeriodTransactions from "@/components/transactions/PeriodTransactions";
import NoTransactionsForPeriod from "@/components/transactions/NoTransactionsForPeriod";

export default async function CategoryExpensesList({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<TransactionByCategorySearchParams>;
}) {
  const awaitedSearchParams = await searchParams;
  const awaitedParams = await params;

  notFoundOnInvalidParams(awaitedParams, awaitedSearchParams);

  var expensesByDate: TransactionsByDate[] = [];
  try {
    expensesByDate = await getExpensesByCategory({
      categoryId: awaitedParams.id,
      ...dateFromSearchParams(awaitedSearchParams),
      sortBy: (awaitedSearchParams.sortBy as SortTransactionBy) || "date",
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
  }

  if (!expensesByDate.length) {
    return (
      <NoTransactionsForPeriod
        type="expenses"
        searchParams={awaitedSearchParams}
      />
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {expensesByDate.map((expense) => (
        <PeriodTransactions
          key={expense.date.toISOString()}
          type="expenses"
          transactions={expense}
          searchParams={new URLSearchParams(
            awaitedSearchParams as Record<string, string>,
          ).toString()}
        />
      ))}
    </Stack>
  );
}
