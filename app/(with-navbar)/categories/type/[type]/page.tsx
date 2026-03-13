import { getAllCategoriesByType } from '@/data/category';
import { CategoryType } from '@/types/category';
import { UnauthorizedError } from '@/utils/error';
import { notFound, redirect } from 'next/navigation';

export default async function CategoriesByTypePage({
  params,
}: PageProps<'/categories/type/[type]'>) {
  const { type } = await params;

  if (!isValidCategoryType(type)) notFound();

  try {
    await getAllCategoriesByType(type);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  return <>123</>;
}

function isValidCategoryType(value: string): value is CategoryType {
  const VALID_CATEGORY_TYPES: CategoryType[] = ['expense', 'income'];

  return VALID_CATEGORY_TYPES.includes(value as CategoryType);
}
