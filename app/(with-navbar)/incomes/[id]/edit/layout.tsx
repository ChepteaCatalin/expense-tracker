import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import FormNavigateBackBtn from "../../_components/FormNavigateBackBtn";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Edit Income",
  description: "Edit an existing income",
};

export default function EditIncomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Suspense fallback={<Skeleton className="mb-1 h-8 w-19" />}>
          <FormNavigateBackBtn />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}
