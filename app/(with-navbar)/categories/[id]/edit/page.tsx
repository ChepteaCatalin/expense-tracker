import { getCategoryById } from '@/data/category';
import { validIdParam } from '@/utils/url';
import { notFound, redirect } from 'next/navigation';
import Form from '../../_components/form/Form';
import { UnauthorizedError } from '@/utils/error';

export default async function EditCategoryPage({
  params,
}: PageProps<'/categories/[id]/edit'>) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  try {
    var category = await getCategoryById(+id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  if (!category) notFound();

  return <Form defaultValues={category} />;
}
