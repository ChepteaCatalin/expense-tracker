import { getSession } from '@/data/auth';
import Form from '../../_components/Form';
import { getAllCategoriesByType } from '@/data/category';

export default async function EditExpense() {
  const categories = await getAllCategoriesByType('expense');
  const currency = (await getSession())?.user.currency;

  return <Form currency={currency} categories={categories} />;
}
