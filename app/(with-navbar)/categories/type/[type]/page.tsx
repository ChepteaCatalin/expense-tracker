import { getAllCategoriesByType } from '@/data/category';
import { CategoryType } from '@/types/category';
import { UnauthorizedError } from '@/utils/error';
import Box from '@mui/material/Box';
import { notFound, redirect } from 'next/navigation';
import CategoryIconButton from './CategoryIconButton';
import { categoryIcons } from '@/utils/category-icons';

export default async function CategoriesByTypePage({
  params,
}: PageProps<'/categories/type/[type]'>) {
  const { type } = await params;

  if (!isValidCategoryType(type)) notFound();

  try {
    var categories = await getAllCategoriesByType(type);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  return (
    <Box>
      {categories.map(category => (
        <CategoryIconButton
          key={category.id}
          icon={categoryIcons.find(icon => icon.src === category.icon)}
          backgroundColor={category.backgroundColor}
          strokeColor={category.strokeColor}
        />
      ))}
    </Box>
  );
}

function isValidCategoryType(value: string): value is CategoryType {
  const VALID_CATEGORY_TYPES: CategoryType[] = ['expense', 'income'];

  return VALID_CATEGORY_TYPES.includes(value as CategoryType);
}
