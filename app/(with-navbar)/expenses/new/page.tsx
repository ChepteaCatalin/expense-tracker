import BackToLink from '@/components/BackToLink';
import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import Form from '../_components/Form';
import { redirect } from 'next/navigation';
import { getAllCategoriesByType } from '@/data/category';
import { UnauthorizedError } from '@/utils/error';
import { Category } from '@/types/category';
import { NoExpenseCategories } from '../_components/NoExpenseCategories';

export const metadata = {
  title: 'New Expense',
  description: 'Add a new expense to your tracker',
};

export default async function NewExpense() {
  var categories: Category[] = [];
  try {
    categories = await getAllCategoriesByType('expense');
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <BackToLink href="/expenses" pageName="Expenses" sx={{ mb: 0.5 }} />
      }
    >
      {!categories.length ? (
        <NoExpenseCategories />
      ) : (
        <Form categories={categories} />
      )}
    </TitledCardPageWrapper>
  );
}
