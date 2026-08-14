import Skeleton from "@mui/material/Skeleton";
import InsightCard from "../_components/InsightCard";

export default function IncomeTreemapLoading() {
  return (
    <InsightCard title="Income by Category">
      <Skeleton
        variant="rectangular"
        height={700}
        sx={{ borderRadius: "4px" }}
      />
    </InsightCard>
  );
}
