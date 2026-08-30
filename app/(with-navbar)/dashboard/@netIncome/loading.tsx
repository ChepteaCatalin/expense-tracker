import Skeleton from "@mui/material/Skeleton";
import InsightCard from "../_components/InsightCard";

export default function NetIncomeLoading() {
  return (
    <InsightCard title="Net Income">
      <Skeleton
        variant="rectangular"
        height={350}
        sx={{ borderRadius: "4px" }}
      />
    </InsightCard>
  );
}
