import Skeleton from "@mui/material/Skeleton";
import InsightCard from "../_components/InsightCard";

export default function IncomeBreakdownLoading() {
  return (
    <InsightCard title="Income Breakdown">
      <Skeleton
        variant="rectangular"
        height={700}
        sx={{ borderRadius: "4px" }}
      />
    </InsightCard>
  );
}
