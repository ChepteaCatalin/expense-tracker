import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';

export default function EditSavingsGoalPage() {
  return (
    <Stack spacing={3}>
      <InputSkeleton />
      <InputSkeleton />
      <Grid container spacing={2}>
        <InputSkeleton sx={{ flex: 1 }} />
        <InputSkeleton sx={{ flex: 1 }} />
      </Grid>
      <InputSkeleton />
      <InputSkeleton height={63} />
      <Divider />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ borderRadius: '4px' }}
      />
    </Stack>
  );
}

function InputSkeleton({
  sx,
  height,
}: {
  sx?: SxProps<Theme>;
  height?: number;
}) {
  return (
    <Skeleton
      variant="rectangular"
      height={height || 40}
      sx={{ borderRadius: '4px', ...sx }}
    />
  );
}
