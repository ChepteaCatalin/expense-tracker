import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function NewExpenseLoading() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        height={40}
        width="150px"
        sx={{ borderRadius: '4px', mx: 'auto' }}
      />
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{ borderRadius: '4px', mt: 3 }}
      />
      <Grid container direction="column" gap={3} mt={3}>
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: '4px' }}
        />
        <Divider />
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: '4px' }}
        />
      </Grid>
    </Box>
  );
}
