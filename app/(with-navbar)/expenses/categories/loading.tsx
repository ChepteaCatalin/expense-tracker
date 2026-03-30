import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import DateNavButtons from '../_components/DateNavButtons';

export default function ExpensesByCategoriesLoading() {
  return (
    <Box>
      <Card sx={{ borderRadius: '10px', p: 1 }}>
        <CardContent sx={{ position: 'relative', '&:last-child': { pb: 2 } }}>
          <DateNavButtons />
          <Skeleton
            variant="rectangular"
            height={250}
            sx={{ borderRadius: '4px', width: '90%', mx: 'auto' }}
          />
        </CardContent>
      </Card>
      <Stack spacing={1.25} mt={2}>
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
      </Stack>
    </Box>
  );
}

function CategoryListItem() {
  return (
    <Card sx={{ borderRadius: '10px' }}>
      <CardContent sx={{ p: 1.25, '&:last-child': { pb: 1.25 } }}>
        <Skeleton
          variant="rectangular"
          height={32}
          sx={{ borderRadius: '4px' }}
        />
      </CardContent>
    </Card>
  );
}
