import BackToLink from '@/components/BackToLink';
import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import Form from '../_components/Form';
import { getAllCategoriesByType } from '@/data/category';
import { NoExpenseCategories } from '../_components/NoExpenseCategories';
import { requireAuth } from '@/lib/auth-utils';

export const metadata = {
  title: 'New Expense',
  description: 'Add a new expense to your tracker',
};

export default async function NewExpense() {
  const {
    user: { currency },
  } = await requireAuth();
  const categories = await getAllCategoriesByType('expense');

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
        <Form currency={currency} categories={categories} />
      )}
    </TitledCardPageWrapper>
  );
}
