import { Skeleton } from "@/components/ui/skeleton";
import InsightCard from "../_components/InsightCard";

export default function NetIncomeLoading() {
  return (
    <InsightCard title="Net Income">
      <Skeleton className="h-87.5 w-full rounded-sm" />
    </InsightCard>
  );
}
