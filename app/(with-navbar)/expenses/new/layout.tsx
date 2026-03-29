import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import BackToLink from '@/components/BackToLink';
import { periods } from '../_utils/url';

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
        <BackToLink
          href={{
            pathname: '/expenses/categories',
            query: { period: periods[0] },
          }}
          pageName="Expenses by Category"
          sx={{ mb: 0.5 }}
        />
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}
