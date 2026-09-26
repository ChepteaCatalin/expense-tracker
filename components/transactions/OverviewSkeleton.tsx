import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function OverviewSkeleton() {
  return (
    <Card className="mb-6 rounded-2xl py-0">
      <CardContent className="p-6">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="mt-2 h-8 w-3/5" />
        <Skeleton className="mt-2 h-5 w-24 rounded-4xl" />
        <Skeleton className="mt-6 h-12 w-52" />
      </CardContent>
    </Card>
  );
}
