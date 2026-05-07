import Form from '@/components/transactions/form/Form';
import NoCategoriesFound from '@/components/transactions/NoCategoriesFound';
import { getAllCategoriesByType } from '@/data/category';
import { requireAuth } from '@/lib/auth-utils';

export default async function NewIncome() {
  const {
    user: { currency },
  } = await requireAuth();
  const categories = await getAllCategoriesByType('income');

  if (!categories.length) return <NoCategoriesFound type="income" />;

  return <Form type="income" currency={currency} categories={categories} />;
}
