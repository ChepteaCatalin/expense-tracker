import Skeleton from '@mui/material/Skeleton';
import InsightCard from '../_components/InsightCard';

export default function ExpensesBreakdownLoading() {
  return (
    <InsightCard title="Expenses Breakdown">
      <Skeleton
        variant="rectangular"
        height={700}
        sx={{ borderRadius: '4px' }}
      />
    </InsightCard>
  );
}
