import { getCategoryById } from '@/data/category';
import { validIdParam } from '@/utils/url';
import { notFound, redirect } from 'next/navigation';
import Form from '../../_components/form/Form';
import { UnauthorizedError } from '@/utils/error';
import DeleteCategory from '../../_components/DeleteCategory';
import PageWrapper from '../../_components/PageWrapper';
import { metadata } from './constants';

export { metadata };

export default async function ManageCategoryPage({
  params,
}: PageProps<'/categories/[id]/manage'>) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  try {
    var category = await getCategoryById(+id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  if (!category) notFound();

  return (
    <PageWrapper title={metadata.title} subtitle={metadata.description}>
      <Form category={category} />
      <DeleteCategory id={category.id} name={category.name} />
    </PageWrapper>
  );
}
