import Form from '../_components/form/Form';
import { requireAuth } from '@/lib/auth-utils';
import PageWrapper from '../_components/PageWrapper';

export const metadata = {
  title: 'New Category',
  description: 'Create a new expense or income category',
};

export default async function NewCategoryPage() {
  await requireAuth();

  return (
    <PageWrapper title={metadata.title} subtitle={metadata.description}>
      <Form />
    </PageWrapper>
  );
}
