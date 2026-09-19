import TransactionCategoriesChart from "@/components/transactions/TransactionCategoriesChart";
import Stack from "@mui/material/Stack";
import CategoryListItem from "@/components/transactions/CategoryListItem";
import NoTransactionsForPeriod from "@/components/transactions/NoTransactionsForPeriod";
import {
  dateFromSearchParams,
  validSearchParams,
} from "@/utils/transactions/url";
import { notFound, redirect } from "next/navigation";
import DateNavButtons from "@/components/transactions/DateNavButtons";
import type { TransactionCategory } from "@/types/transaction";
import { type TransactionCategoriesSearchParams } from "@/types/transaction";
import { getExpenseCategories } from "@/data/expense";
import { UnauthorizedError } from "@/utils/error";
import { getSession } from "@/data/auth";
import NewExpenseFab from "../_components/NewExpenseFab";
import { getCategoryPercentages } from "@/utils/transactions/misc";
import { Card, CardContent } from "@/components/ui/card";

export default async function ExpenseCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<TransactionCategoriesSearchParams>;
}) {
  const params = await searchParams;
  if (!validSearchParams(params)) notFound();

  var expensesByCategory = [] as TransactionCategory[];
  var session: Awaited<ReturnType<typeof getSession>> = null;
  try {
    [expensesByCategory, session] = await Promise.all([
      getExpenseCategories(dateFromSearchParams(params)),
      getSession(),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    throw err;
  }

  const currency = session!.user.currency;
  const categoryPercentages = getCategoryPercentages(expensesByCategory);

  return (
    <div>
      <Card className="[--card-spacing:--spacing(2)]">
        <CardContent>
          <DateNavButtons type="expenses" />
          <TransactionCategoriesChart
            currency={currency}
            data={expensesByCategory.map((category) => ({
              name: category.name,
              value: category.totalAmount,
              color: category.backgroundColor,
            }))}
          />
        </CardContent>
      </Card>
      <Stack spacing={1.25} sx={{ mt: 2 }}>
        {!expensesByCategory.length ? (
          <NoTransactionsForPeriod type="expenses" searchParams={params} />
        ) : (
          expensesByCategory.map((c) => (
            <CategoryListItem
              key={c.categoryId}
              type="expenses"
              category={{
                id: c.categoryId,
                name: c.name,
                icon: c.icon,
                strokeColor: c.strokeColor,
                backgroundColor: c.backgroundColor,
                amount: c.totalAmount,
                percentage: categoryPercentages[c.categoryId],
              }}
              currency={currency}
              searchParams={params}
            />
          ))
        )}
      </Stack>
      <NewExpenseFab searchParams={params} />
    </div>
  );
}
