import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import PageWrapper from './_components/PageWrapper';

export const metadata = {
  title: 'Categories',
  description: 'Manage your expense and income categories',
};

export default function CategoriesLoading() {
  return (
    <PageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ mb: 1, borderRadius: '10px' }}
        />
      }
    >
      <Box>
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{ borderRadius: '10px' }}
        />
        <Grid container direction="column" spacing={3} mt={3}>
          <Divider />
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{ borderRadius: '4px' }}
          />
        </Grid>
      </Box>
    </PageWrapper>
  );
}
