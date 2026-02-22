import Form from '../_components/form/Form';
import PageWrapper from '../_components/PageWrapper';

export const metadata = {
  title: 'New Category',
  description: 'Create a new expense or income category',
};

export default async function NewCategoryPage() {
  return (
    <PageWrapper title={metadata.title} subtitle={metadata.description}>
      <Form />
    </PageWrapper>
  );
}
