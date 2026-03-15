import BackToLink from '@/components/BackToLink';
import Form from '../_components/form/Form';
import PageWrapper from '../_components/PageWrapper';
import { isValidCategoryType } from '../utils';
import { metadata } from './constants';
import { notFound } from 'next/navigation';

export { metadata };

export default async function NewCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const { type } = await searchParams;

  if (!isValidCategoryType(type)) notFound();

  return (
    <PageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <BackToLink
          href={{ pathname: '/categories', query: { type } }}
          pageName="Categories"
          sx={{ mb: 0.5 }}
        />
      }
    >
      <Form type={type} />
    </PageWrapper>
  );
}
