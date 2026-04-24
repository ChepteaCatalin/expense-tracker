import type {
  ExpensesByCategorySearchParams,
  ExpensesByDate,
  SortExpenseBy,
} from '@/types/expense';
import { validateParams } from '../utils';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import { getExpensesByCategory } from '@/data/expense';
import { dateFromSearchParams } from '../../../_utils/url';
import Stack from '@mui/material/Stack';
import ExpenseListItem from './ExpenseListItem';

export default async function ExpensesList({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  const awaitedSearchParams = await searchParams;
  const awaitedParams = await params;

  validateParams(awaitedParams, awaitedSearchParams);

  var expenses: ExpensesByDate[] = [];
  try {
    expenses = await getExpensesByCategory({
      categoryId: awaitedParams.id,
      ...dateFromSearchParams(awaitedSearchParams),
      sortBy: (awaitedSearchParams.sortBy as SortExpenseBy) || 'date',
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {expenses.map(expense => (
        <ExpenseListItem key={expense.date.toISOString()} expense={expense} />
      ))}
    </Stack>
  );
}
