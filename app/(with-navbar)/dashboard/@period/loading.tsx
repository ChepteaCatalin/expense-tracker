import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function PeriodLoading() {
  return (
    <Stack direction="row" sx={{ mb: 1.5, alignItems: 'center', gap: 0.5 }}>
      <Skeleton
        variant="rectangular"
        width={234}
        height={40}
        sx={{ borderRadius: '8px' }}
      />
      <Skeleton
        variant="rectangular"
        width={40}
        height={40}
        sx={{ borderRadius: '8px' }}
      />
    </Stack>
  );
}
