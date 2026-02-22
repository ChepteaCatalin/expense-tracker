import PageWrapper from '../../_components/PageWrapper';

export const metadata = {
  title: 'Manage Category',
  description: 'Manage an expense or income category',
};

export default function ManageCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper title={metadata.title} subtitle={metadata.description}>
      {children}
    </PageWrapper>
  );
}
