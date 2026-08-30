import type { TransactionsByDate } from "@/types/transaction";
import {
  type SortTransactionBy,
  type TransactionByCategorySearchParams,
} from "@/types/transaction";
import { UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import {
  dateFromSearchParams,
  notFoundOnInvalidParams,
} from "@/utils/transactions/url";
import Stack from "@mui/material/Stack";
import { getIncomesByCategory } from "@/data/income";
import PeriodTransactions from "@/components/transactions/PeriodTransactions";
import NoTransactionsForPeriod from "@/components/transactions/NoTransactionsForPeriod";

export default async function CategoryIncomesList({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<TransactionByCategorySearchParams>;
}) {
  const awaitedSearchParams = await searchParams;
  const awaitedParams = await params;

  notFoundOnInvalidParams(awaitedParams, awaitedSearchParams);

  var incomesByDate: TransactionsByDate[] = [];
  try {
    incomesByDate = await getIncomesByCategory({
      categoryId: awaitedParams.id,
      ...dateFromSearchParams(awaitedSearchParams),
      sortBy: (awaitedSearchParams.sortBy as SortTransactionBy) || "date",
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
  }

  if (!incomesByDate.length) {
    return (
      <NoTransactionsForPeriod
        type="incomes"
        searchParams={awaitedSearchParams}
      />
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {incomesByDate.map((income) => (
        <PeriodTransactions
          key={income.date.toISOString()}
          type="incomes"
          transactions={income}
          searchParams={new URLSearchParams(
            awaitedSearchParams as Record<string, string>,
          ).toString()}
        />
      ))}
    </Stack>
  );
}
