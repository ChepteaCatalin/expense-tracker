import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function LoadingSkeleton() {
  return (
    <Grid container direction="column" spacing={3}>
      <Skeleton variant="rectangular" height={40} />
      <Box>
        <Skeleton variant="text" height={23} width="10%" />
        <Skeleton variant="rectangular" height={33} width="35%" />
      </Box>
      <Box>
        <Skeleton variant="text" height={24} width="10%" />
        <Skeleton variant="rectangular" height={264} />
      </Box>
      <Skeleton variant="rectangular" height={44} />
      <Divider />
      <Skeleton variant="rectangular" height={40} />
    </Grid>
  );
}
