import EditCategory from './EditCategory';
import { Suspense } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import PageWrapper from '../../_components/PageWrapper';

export const metadata = {
  title: 'Edit Category',
  description: 'Edit an expense or income category',
};

export default async function EditCategoryPage({
  params,
}: PageProps<'/categories/[id]/edit'>) {
  return (
    <PageWrapper title={metadata.title} subtitle={metadata.description}>
      <Suspense fallback={<LoadingSkeleton />}>
        {params.then(({ id }) => (
          <EditCategory id={id} />
        ))}
      </Suspense>
    </PageWrapper>
  );
}
