import Box from '@mui/material/Box';
import Section from './Section';
import Skeleton from '@mui/material/Skeleton';

export default function PreferencesSkeleton() {
  return (
    <Section title="Preferences">
      <Box mt={1}>
        <Skeleton variant="rectangular" height={40} />
      </Box>
    </Section>
  );
}
