import Skeleton from '@mui/material/Skeleton';
import InsightCard from '../_components/InsightCard';

export default function IncomeVsExpensesLoading() {
  return (
    <InsightCard title="Income vs Expenses">
      <Skeleton
        variant="rectangular"
        height={350}
        sx={{ borderRadius: '4px' }}
      />
    </InsightCard>
  );
}
