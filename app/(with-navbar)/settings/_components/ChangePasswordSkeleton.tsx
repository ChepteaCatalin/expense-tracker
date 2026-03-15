import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Section from './Section';

export default function ChangePasswordSkeleton() {
  return (
    <Section title="Change Password">
      <Stack spacing={3} p={1}>
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
      </Stack>
    </Section>
  );
}
