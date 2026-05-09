import TransactionCategoriesChart from '@/components/transactions/TransactionCategoriesChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CategoryListItem from '@/components/transactions/CategoryListItem';
import NoExpensesForPeriod from './_components/NoExpensesForPeriod';
import {
  dateFromSearchParams,
  validSearchParams,
} from '@/utils/transactions/url';
import { notFound, redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import DateNavButtons from '@/components/transactions/DateNavButtons';
import type { TransactionCategory } from '@/types/transaction';
import { type TransactionCategoriesSearchParams } from '@/types/transaction';
import { getExpenseCategories } from '@/data/expense';
import { UnauthorizedError } from '@/utils/error';
import { getSession } from '@/data/auth';
import NewExpenseFab from '../_components/NewExpenseFab';
import { getCategoryPercentages } from '@/utils/transactions/misc';

export default async function ExpenseCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<TransactionCategoriesSearchParams>;
}) {
  const params = await searchParams;
  if (!validSearchParams(params)) notFound();

  var expensesByCategory = [] as TransactionCategory[];
  try {
    expensesByCategory = await getExpenseCategories(
      dateFromSearchParams(params),
    );
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  const session = await getSession();
  const currency = session!.user.currency;
  const categoryPercentages = getCategoryPercentages(expensesByCategory);

  return (
    <Box>
      <Card
        sx={{
          borderRadius: '12px',
          pt: 1,
          px: 1,
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          background:
            'linear-gradient(160deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.16)',
        }}
      >
        <CardContent
          sx={{ p: 0, '&:last-child': { pb: 1 }, position: 'relative' }}
        >
          <DateNavButtons type="expenses" />
          <TransactionCategoriesChart
            currency={currency}
            data={expensesByCategory.map(category => ({
              name: category.name,
              value: category.totalAmount,
              color: category.backgroundColor,
            }))}
          />
        </CardContent>
      </Card>
      <Stack spacing={1.25} sx={{ mt: 2 }}>
        {!expensesByCategory.length ? (
          <NoExpensesForPeriod searchParams={params} />
        ) : (
          expensesByCategory.map(c => (
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
    </Box>
  );
}
