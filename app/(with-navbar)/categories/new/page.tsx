import BackToLink from '@/components/BackToLink';
import Form from '../_components/form/Form';
import PageWrapper from '../_components/PageWrapper';

export const metadata = {
  title: 'New Category',
  description: 'Create a new expense or income category',
};

export default async function NewCategoryPage() {
  return (
    <PageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <BackToLink
          href="/categories/type/expense"
          pageName="Categories"
          sx={{ mb: 0.5 }}
        />
      }
    >
      <Form />
    </PageWrapper>
  );
}
