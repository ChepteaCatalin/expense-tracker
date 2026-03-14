import Section from './Section';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

export default function PreferencesSkeleton() {
  return (
    <Section title="Preferences">
      <Grid container spacing={3} direction="column" mt={1}>
        <Skeleton variant="rectangular" height={40} />
        <Skeleton variant="rectangular" height={40} />
      </Grid>
    </Section>
  );
}
