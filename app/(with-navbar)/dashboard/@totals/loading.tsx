import Skeleton from "@mui/material/Skeleton";
import InsightCard from "../_components/InsightCard";
import Divider from "@mui/material/Divider";

export default function TotalsLoading() {
  return (
    <InsightCard title="Totals">
      <Skeleton variant="rectangular" height={20} />
      <Divider sx={dividerSx} />
      <Skeleton variant="rectangular" height={20} />
      <Divider sx={dividerSx} />
      <Skeleton variant="rectangular" height={28} />
      <Divider sx={dividerSx} />
      <Skeleton variant="rectangular" height={20} />
    </InsightCard>
  );
}

const dividerSx = { my: 1, borderColor: "rgba(255,255,255,0.07)" };
