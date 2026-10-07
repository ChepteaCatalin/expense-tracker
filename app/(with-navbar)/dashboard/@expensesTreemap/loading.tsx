import { Skeleton } from "@/components/ui/skeleton";
import InsightCard from "../_components/InsightCard";

export default function ExpensesTreemapLoading() {
  return (
    <InsightCard title="Expenses by Category">
      <Skeleton className="h-175 w-full rounded-sm" />
    </InsightCard>
  );
}
