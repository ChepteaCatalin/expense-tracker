import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CategoryTransactionsListFallback() {
  return (
    <Box sx={{ mt: 3 }}>
      <Skeleton
        variant="text"
        width="100px"
        height={21}
        sx={{ borderRadius: '4px', ml: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={120}
        sx={{ borderRadius: '14px' }}
      />
      <Skeleton
        variant="text"
        width="100px"
        height={21}
        sx={{ borderRadius: '4px', mt: 2, ml: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={120}
        sx={{ borderRadius: '14px' }}
      />
    </Box>
  );
}
