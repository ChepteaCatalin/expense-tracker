import { getCategoryById } from '@/data/category';
import { validIdParam } from '@/utils/url';
import { notFound, redirect } from 'next/navigation';
import Form from '../../_components/form/Form';
import { UnauthorizedError } from '@/utils/error';
import DeleteCategory from '../../_components/DeleteCategory';

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
    <>
      <Form category={category} />
      <DeleteCategory id={category.id} name={category.name} />
    </>
  );
}
