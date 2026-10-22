import { Skeleton } from "@/components/ui/skeleton";
import InsightCard from "../_components/InsightCard";

export default function DebtBalanceLoading() {
  return (
    <InsightCard title="Remaining Debt">
      <Skeleton className="h-125 w-full rounded-sm" />
    </InsightCard>
  );
}
