import { Skeleton } from "@/components/ui/skeleton";
import InsightCard from "../_components/InsightCard";

export default function IncomeBreakdownLoading() {
  return (
    <InsightCard title="Income Breakdown">
      <Skeleton className="h-175 w-full rounded-sm" />
    </InsightCard>
  );
}
