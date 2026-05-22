import Heading from '@/components/Heading';
import PageWrapper from '@/components/PageWrapper';

export const metadata = {
  title: 'Income',
  description: 'Manage income for a specific category',
};

export default function IncomesByCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
      {children}
    </PageWrapper>
  );
}
