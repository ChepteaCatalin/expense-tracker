import BackBtnSkeleton from "@/components/BackBtnSkeleton";
import BackToLink from "@/components/BackToLink";
import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import { Suspense } from "react";

export const metadata = {
  title: "Edit Goal",
  description: "Edit an existing savings goal",
};

export default async function EditSavingsGoalLayout({
  params,
  children,
}: LayoutProps<"/savings/[id]/edit">) {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Suspense fallback={<BackBtnSkeleton />}>
          <SavingsGoalDetailsLink params={params} />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}

async function SavingsGoalDetailsLink({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BackToLink href={`/savings/${id}/details`} />;
}
