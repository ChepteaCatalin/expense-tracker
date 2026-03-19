import Fab from '@/components/Fab';
import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import Link from 'next/link';

export const metadata = {
  title: 'Expenses',
  description: 'Track and organize your spending',
};

export default function ExpensesPage() {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
    >
      <Link href="/expenses/new">
        <Fab />
      </Link>
    </TitledCardPageWrapper>
  );
}
