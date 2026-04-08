import Section from './Section';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

export default function PreferencesSkeleton() {
  return (
    <Section title="Preferences">
      <Grid container spacing={3} sx={{ mt: 1, flexDirection: 'column' }}>
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
    </Section>
  );
}
