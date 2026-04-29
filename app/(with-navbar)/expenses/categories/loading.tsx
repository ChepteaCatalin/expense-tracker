import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ExpenseCategoriesLoading() {
  return (
    <Box>
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent>
          <Skeleton
            variant="rectangular"
            height={250}
            sx={{ borderRadius: '4px' }}
          />
        </CardContent>
      </Card>
      <Stack spacing={1.25} sx={{ mt: 2 }}>
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
          height={36}
          sx={{ borderRadius: '4px' }}
        />
      </CardContent>
    </Card>
  );
}
