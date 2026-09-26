import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import FormNavigateBackBtn from "../../_components/FormNavigateBackBtn";
import { Suspense } from "react";
import BackBtnSkeleton from "@/components/BackBtnSkeleton";

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
        <Suspense fallback={<BackBtnSkeleton />}>
          <FormNavigateBackBtn />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}
