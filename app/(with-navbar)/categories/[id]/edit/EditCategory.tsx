import { getCategoryById } from '@/data/category';
import { validIdParam } from '@/utils/url';
import { redirect } from 'next/navigation';
import Form from '../../_components/form/Form';

export default async function EditCategory({ id }: { id: string }) {
  //TODO: define the /categories page
  if (!validIdParam(id)) return redirect('/categories');

  const category = await getCategoryById(+id);

  return <Form defaultValues={category} />;
}
