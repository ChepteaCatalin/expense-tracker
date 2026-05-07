import Form from '@/components/transactions/form/Form';
import { getAllCategoriesByType } from '@/data/category';
import NoCategoriesFound from '@/components/transactions/NoCategoriesFound';
import { requireAuth } from '@/lib/auth-utils';
import { createExpense } from '../actions';

export default async function NewExpense() {
  const {
    user: { currency },
  } = await requireAuth();
  const categories = await getAllCategoriesByType('expense');

  if (!categories.length) return <NoCategoriesFound type="expense" />;
  return (
    <Form
      type="expense"
      currency={currency}
      categories={categories}
      createAction={createExpense}
    />
  );
}
