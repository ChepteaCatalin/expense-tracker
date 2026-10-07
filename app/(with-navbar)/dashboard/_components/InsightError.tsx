import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import InsightCard from "./InsightCard";

export default function InsightError({
  title,
  retry,
}: {
  title: string;
  retry: () => void;
}) {
  return (
    <InsightCard title={title}>
      <div className="flex flex-col items-center justify-center gap-3 py-4">
        <CircleAlert className="text-destructive size-15 opacity-80" />
        <p className="text-muted-foreground text-center">
          Unable to load this insight
        </p>
        <Button size="sm" variant="destructive" onClick={retry}>
          Try again
        </Button>
      </div>
    </InsightCard>
  );
}
