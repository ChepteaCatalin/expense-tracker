import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import BackToExpenseCategoriesBtn from '../_components/BackToExpenseCategoriesBtn';

export const metadata = {
  title: 'New Expense',
  description: 'Add a new expense to your tracker',
};

export default function NewExpenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<BackToExpenseCategoriesBtn />}
    >
      {children}
    </TitledCardPageWrapper>
  );
}
