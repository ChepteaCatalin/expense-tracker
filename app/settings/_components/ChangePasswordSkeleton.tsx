import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Section from './Section';

export default function ChangePasswordSkeleton() {
  return (
    <Section title="Change Password">
      <Stack spacing={3} p={1}>
        <Skeleton variant="rectangular" height={40} />
        <Skeleton variant="rectangular" height={40} />
        <Skeleton variant="rectangular" height={40} />
        <Divider />
        <Skeleton variant="rectangular" height={40} />
      </Stack>
    </Section>
  );
}
