import EditCategory from './EditCategory';
import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LoadingSkeleton from './LoadingSkeleton';

export const metadata = {
  title: 'Edit Category',
  description: 'Edit an expense or income category',
};

export default async function EditCategoryPage({
  params,
}: PageProps<'/categories/[id]/edit'>) {
  return (
    <Box boxSizing="content-box" maxWidth="610px" mx="auto">
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent>
          <Suspense fallback={<LoadingSkeleton />}>
            {params.then(({ id }) => (
              <EditCategory id={id} />
            ))}
          </Suspense>
        </CardContent>
      </Card>
    </Box>
  );
}
