import Form from '../_components/Form';
import { getAllCategoriesByType } from '@/data/category';
import { NoExpenseCategories } from '../_components/NoExpenseCategories';
import { requireAuth } from '@/lib/auth-utils';

export default async function NewExpense() {
  const {
    user: { currency },
  } = await requireAuth();
  const categories = await getAllCategoriesByType('expense');

  if (!categories.length) return <NoExpenseCategories />;
  return <Form currency={currency} categories={categories} />;
}
