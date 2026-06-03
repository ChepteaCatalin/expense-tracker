import Grid from '@mui/material/Grid';
import InsightCard from './_components/InsightCard';
import PeriodSelector from './_components/PeriodSelector';

export default function DashboardPage() {
  return (
    <Grid container spacing={2}>
      <PeriodSelector />
      <Grid size={{ xs: 12, md: 6 }}>
        <InsightCard title="Total Expenses">$1,250.00</InsightCard>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <InsightCard title="Total Expenses">$1,250.00</InsightCard>
      </Grid>
    </Grid>
  );
}
