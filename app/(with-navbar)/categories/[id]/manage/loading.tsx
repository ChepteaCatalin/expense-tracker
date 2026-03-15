import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { metadata } from './constants';

export default function ManageCategoryLoading() {
  return (
    <Box boxSizing="content-box" maxWidth="610px" mx="auto">
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Skeleton
        variant="rectangular"
        height={28}
        sx={{ mb: 0.5, width: '180px', borderRadius: '4px' }}
      />
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent>
          <Grid container direction="column" spacing={3}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ borderRadius: '4px' }}
            />
            <Box>
              <Skeleton variant="text" height={23} width="10%" />
              <Skeleton
                variant="rectangular"
                height={33}
                width="35%"
                sx={{ borderRadius: '4px' }}
              />
            </Box>
            <Box>
              <Skeleton variant="text" height={24} width="10%" />
              <Skeleton
                variant="rectangular"
                height={264}
                sx={{ borderRadius: '10px' }}
              />
            </Box>
            <Skeleton
              variant="rectangular"
              height={44}
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
        </CardContent>
      </Card>
    </Box>
  );
}
