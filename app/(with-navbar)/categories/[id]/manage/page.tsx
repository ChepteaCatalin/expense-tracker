import { getCategoryById } from '@/data/category';
import { validIdParam } from '@/utils/url';
import { notFound, redirect } from 'next/navigation';
import Form from '../../_components/form/Form';
import { UnauthorizedError } from '@/utils/error';
import DeleteCategory from '../../_components/DeleteCategory';
import PageWrapper from '../../_components/PageWrapper';
import { metadata } from './constants';
import BackToLink from '@/components/BackToLink';

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
    <PageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <BackToLink
          href={`/categories/type/${category.type}`}
          pageName="Categories"
          sx={{ mb: 0.5 }}
        />
      }
    >
      <Form category={category} />
      <DeleteCategory
        id={category.id}
        type={category.type}
        name={category.name}
      />
    </PageWrapper>
  );
}
