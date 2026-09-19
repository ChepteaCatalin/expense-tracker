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
import type {
  TransactionCategory,
  TransactionCategoriesSearchParams,
} from "@/types/transaction";
import { UnauthorizedError } from "@/utils/error";
import { getSession } from "@/data/auth";
import NewIncomeFab from "../_components/NewIncomeFab";
import { getCategoryPercentages } from "@/utils/transactions/misc";
import { getIncomeCategories } from "@/data/income";
import { Card, CardContent } from "@/components/ui/card";

export default async function IncomeCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<TransactionCategoriesSearchParams>;
}) {
  const params = await searchParams;
  if (!validSearchParams(params)) notFound();

  var incomesByCategory = [] as TransactionCategory[];
  var session: Awaited<ReturnType<typeof getSession>> = null;
  try {
    [incomesByCategory, session] = await Promise.all([
      getIncomeCategories(dateFromSearchParams(params)),
      getSession(),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    throw err;
  }

  const currency = session!.user.currency;
  const categoryPercentages = getCategoryPercentages(incomesByCategory);

  return (
    <div>
      <Card className="[--card-spacing:--spacing(2)]">
        <CardContent>
          <DateNavButtons type="incomes" />
          <TransactionCategoriesChart
            currency={currency}
            data={incomesByCategory.map((category) => ({
              name: category.name,
              value: category.totalAmount,
              color: category.backgroundColor,
            }))}
          />
        </CardContent>
      </Card>
      <Stack spacing={1.25} sx={{ mt: 2 }}>
        {!incomesByCategory.length ? (
          <NoTransactionsForPeriod type="incomes" searchParams={params} />
        ) : (
          incomesByCategory.map((c) => (
            <CategoryListItem
              key={c.categoryId}
              type="incomes"
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
      <NewIncomeFab searchParams={params} />
    </div>
  );
}
