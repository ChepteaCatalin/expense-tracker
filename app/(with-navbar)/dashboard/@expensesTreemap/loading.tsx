import Skeleton from "@mui/material/Skeleton";
import InsightCard from "../_components/InsightCard";

export default function ExpensesTreemapLoading() {
  return (
    <InsightCard title="Expenses by Category">
      <Skeleton
        variant="rectangular"
        height={700}
        sx={{ borderRadius: "4px" }}
      />
    </InsightCard>
  );
}
