import { Skeleton } from "./ui/skeleton";
import { cn } from "cn";

export default function BackBtnSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("mb-1 h-8 w-19", className)} />;
}
