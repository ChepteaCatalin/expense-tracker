import { getAllCategoriesByType } from '@/data/category';
import { CategoryType } from '@/types/category';
import { UnauthorizedError } from '@/utils/error';
import { notFound, redirect } from 'next/navigation';
import CategoryIconButton from './_CategoryIconButton/CategoryIconButton';
import { categoryIcons } from '@/utils/category-icons';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

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
    <Grid container direction="column" spacing={3}>
      {categories.map(category => (
        <CategoryIconButton
          key={category.id}
          id={category.id}
          icon={categoryIcons.find(icon => icon.src === category.icon)}
          backgroundColor={category.backgroundColor}
          strokeColor={category.strokeColor}
        />
      ))}
      <Divider />
      <Link href="/categories/new">
        <Button variant="contained" startIcon={<AddIcon />} fullWidth>
          New category
        </Button>
      </Link>
    </Grid>
  );
}

function isValidCategoryType(value: string): value is CategoryType {
  const VALID_CATEGORY_TYPES: CategoryType[] = ['expense', 'income'];

  return VALID_CATEGORY_TYPES.includes(value as CategoryType);
}
