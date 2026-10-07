import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import InsightCard from "../_components/InsightCard";

export default function TotalsLoading() {
  return (
    <InsightCard title="Totals">
      <Skeleton className="h-5 w-full rounded-sm" />
      <Separator className="my-2" />
      <Skeleton className="h-5 w-full rounded-sm" />
      <Separator className="my-2" />
      <Skeleton className="h-7 w-full rounded-sm" />
      <Separator className="my-2" />
      <Skeleton className="h-5 w-full rounded-sm" />
    </InsightCard>
  );
}
