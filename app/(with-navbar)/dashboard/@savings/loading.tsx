import { Skeleton } from "@/components/ui/skeleton";
import InsightCard from "../_components/InsightCard";

export default function SavingsLoading() {
  return (
    <InsightCard title="Savings">
      <Skeleton className="h-125 w-full rounded-sm" />
    </InsightCard>
  );
}
