import PageWrapper from '../../_components/PageWrapper';

export const metadata = {
  title: 'Edit Category',
  description: 'Edit an expense or income category',
};

export default function EditCategoryLayout({
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
