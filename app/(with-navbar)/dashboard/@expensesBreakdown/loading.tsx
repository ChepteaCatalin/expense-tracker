import { Skeleton } from "@/components/ui/skeleton";
import InsightCard from "../_components/InsightCard";

export default function ExpensesBreakdownLoading() {
  return (
    <InsightCard title="Expenses Breakdown">
      <Skeleton className="h-175 w-full rounded-sm" />
    </InsightCard>
  );
}
