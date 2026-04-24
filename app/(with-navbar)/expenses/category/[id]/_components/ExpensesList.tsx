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
import { fromCents } from '@/utils/currency';

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

  //TODO: Handle no expenses (with manual URL)

  return (
    <div>
      {expenses.map(expense => (
        <div key={expense.date.toISOString()}>
          <p>{expense.date.toISOString()}</p>
          <p>{expense.expenses.map(e => e.description).join(', ')}</p>
          <p>{expense.expenses.map(e => fromCents(e.amount)).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
