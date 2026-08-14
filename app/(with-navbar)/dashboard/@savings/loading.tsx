import Skeleton from "@mui/material/Skeleton";
import InsightCard from "../_components/InsightCard";

export default function SavingsLoading() {
  return (
    <InsightCard title="Savings">
      <Skeleton
        variant="rectangular"
        height={500}
        sx={{ borderRadius: "4px" }}
      />
    </InsightCard>
  );
}
