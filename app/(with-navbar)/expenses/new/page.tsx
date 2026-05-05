import Form from '../_components/Form';
import { getAllCategoriesByType } from '@/data/category';
import NoCategoriesFound from '@/components/transactions/NoCategoriesFound';
import { requireAuth } from '@/lib/auth-utils';

export default async function NewExpense() {
  const {
    user: { currency },
  } = await requireAuth();
  const categories = await getAllCategoriesByType('expense');

  if (!categories.length) return <NoCategoriesFound type="expense" />;
  return <Form currency={currency} categories={categories} />;
}
