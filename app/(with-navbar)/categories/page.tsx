import { getAllCategories } from '@/data/category';
import { UnauthorizedError } from '@/utils/error';
import { notFound, redirect } from 'next/navigation';
import PageWrapper from './_components/PageWrapper';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: 'Categories',
  description: 'Manage your expense and income categories',
};

export default async function CategoriesPage() {
  try {
    var categories = await getAllCategories();
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  return (
    <PageWrapper title={metadata.title} subtitle={metadata.description}>
      {!categories?.length && <Typography>No categories added yet.</Typography>}
    </PageWrapper>
  );
}
