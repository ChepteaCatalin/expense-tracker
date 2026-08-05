import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function AccountDetailsSkeleton() {
  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', height: '60px' }}
      >
        <Skeleton variant="circular" width={56} height={56} />
        <Stack spacing={0.5} sx={{ flex: 1 }}>
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" width="60%" height={16} />
        </Stack>
      </Stack>
      <Divider />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ borderRadius: '4px' }}
      />
    </Stack>
  );
}
