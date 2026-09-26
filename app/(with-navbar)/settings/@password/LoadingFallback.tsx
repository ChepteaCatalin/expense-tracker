import Section from "../_components/Section";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFallback() {
  return (
    <Section
      title="Change Password"
      footer={<Skeleton className="h-8 w-full" />}
    >
      <div className="grid gap-5 pb-px">
        <div className="grid gap-2">
          <Skeleton className="h-4.75 w-32.5" />
          <Skeleton className="h-8" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4.75 w-27.75" />
          <Skeleton className="h-8" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4.75 w-41.5" />
          <Skeleton className="h-8" />
        </div>
      </div>
    </Section>
  );
}
