import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function CategoriesByTypeLoading() {
  return (
    <Box>
      <Skeleton variant="rectangular" height={300} />
      <Grid container direction="column" spacing={3} mt={3}>
        <Divider />
        <Skeleton variant="rectangular" height={40} />
      </Grid>
    </Box>
  );
}
