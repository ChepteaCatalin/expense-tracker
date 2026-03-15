import BackToLink from '@/components/BackToLink';
import Form from '../_components/form/Form';
import PageWrapper from '../_components/PageWrapper';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const metadata = {
  title: 'New Category',
  description: 'Create a new expense or income category',
};

export default async function NewCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  return (
    <PageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              width={172}
              height={28}
              sx={{ mb: 0.5, borderRadius: '4px' }}
            />
          }
        >
          <BackToCategoriesLink searchParams={searchParams} />
        </Suspense>
      }
    >
      <Form />
    </PageWrapper>
  );
}

async function BackToCategoriesLink({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const { type } = await searchParams;

  return (
    <BackToLink
      href={{ pathname: '/categories/all', query: { type } }}
      pageName="Categories"
      sx={{ mb: 0.5 }}
    />
  );
}
