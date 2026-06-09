import Typography from '@mui/material/Typography';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams } from '@/types/dashboard';

export default async function Totals({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  return (
    <InsightCard title="Totals">
      <Typography sx={{ fontWeight: 500 }}>123</Typography>
    </InsightCard>
  );
}
