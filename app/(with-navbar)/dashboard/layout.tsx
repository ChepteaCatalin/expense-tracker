import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const metadata = {
  title: 'Dashboard',
  description: 'View your financial overview and insights.',
};

export default function DashboardLayout({
  period,
  totals,
}: {
  period: React.ReactNode;
  totals: React.ReactNode;
}) {
  return (
    <Box>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {period}
        <Grid size={{ xs: 12, md: 4 }}>{totals}</Grid>
      </Grid>
    </Box>
  );
}
