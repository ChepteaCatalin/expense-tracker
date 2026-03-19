import BackToLink from '@/components/BackToLink';
import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';

export const metadata = {
  title: 'New Expense',
  description: 'Add a new expense to your tracker',
};

export default function NewExpense() {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <BackToLink href="/expenses" pageName="Expenses" sx={{ mb: 0.5 }} />
      }
    >
      1
    </TitledCardPageWrapper>
  );
}
