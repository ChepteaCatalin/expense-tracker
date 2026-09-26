import Heading from "@/components/Heading";
import { metadata } from "./constants";
import PageWrapper from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { TypeRadioGroupSkeleton } from "../../_components/form/TypeRadioGroupSkeleton";
import { Separator } from "@/components/ui/separator";

export default function ManageCategoryLoading() {
  return (
    <PageWrapper>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Skeleton className="mb-1 h-8 w-42" />
      <Card>
        <CardContent>
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-13" />
              <Skeleton className="h-8 w-full" />
            </div>
            <TypeRadioGroupSkeleton />
            <div className="space-y-1">
              <Skeleton className="h-5 w-7" />
              <Skeleton className="h-66 w-full lg:h-45" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-9 w-30" />
              <Skeleton className="h-9 w-21" />
            </div>
          </div>
          <Separator className="my-3" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
