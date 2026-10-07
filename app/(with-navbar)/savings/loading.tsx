import Heading from "@/components/Heading";
import { metadata } from "./constants";
import PageWrapper from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavingsGoalsLoading() {
  return (
    <PageWrapper>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Skeleton className="h-120 rounded-2xl lg:h-80" />
    </PageWrapper>
  );
}
