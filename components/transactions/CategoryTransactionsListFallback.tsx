import { Skeleton } from "../ui/skeleton";

export default function CategoryTransactionsListFallback() {
  return (
    <div className="space-y-4">
      <TransactionSkeleton />
      <TransactionSkeleton />
      <TransactionSkeleton />
      <TransactionSkeleton />
    </div>
  );
}

function TransactionSkeleton() {
  return (
    <div>
      <Skeleton className="mb-0.5 h-5 w-34" />
      <Skeleton className="h-13.5" />
    </div>
  );
}
