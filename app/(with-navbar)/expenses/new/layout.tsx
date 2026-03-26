import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import BackToLink from '@/components/BackToLink';

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
      aboveCard={
        <BackToLink href="/expenses" pageName="Expenses" sx={{ mb: 0.5 }} />
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}
