import { getSession } from '@/data/auth';
import Form from '@/components/transactions/form/Form';
import { getAllCategoriesByType } from '@/data/category';
import { getExpenseById } from '@/data/expense';
import { validIdParam } from '@/utils/url';
import { notFound, redirect } from 'next/navigation';
import type { Category } from '@/types/category';
import { type Transaction } from '@/types/transaction';
import { UnauthorizedError } from '@/utils/error';
import { updateExpense, deleteExpense } from '../../actions';

export default async function EditExpense({
  params,
}: PageProps<'/expenses/[id]/edit'>) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  var categories: Category[] = [];
  var expense: Transaction | undefined = undefined;
  try {
    [categories, expense] = await Promise.all([
      getAllCategoriesByType('expense'),
      getExpenseById(+id),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }
  if (!categories.length || !expense) return notFound();

  const currency = (await getSession())?.user.currency;

  return (
    <Form
      key={expense.updatedAt.toISOString()}
      type="expense"
      transaction={expense}
      currency={currency}
      categories={categories}
      updateAction={updateExpense}
      deleteAction={deleteExpense}
    />
  );
}
