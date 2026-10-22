import BackBtnSkeleton from "@/components/BackBtnSkeleton";
import BackToLink from "@/components/BackToLink";
import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import { Suspense } from "react";

export const metadata = {
  title: "Edit Loan",
  description: "Edit an existing loan",
};

export default async function EditLoanLayout({
  params,
  children,
}: LayoutProps<"/loans/[id]/edit">) {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Suspense fallback={<BackBtnSkeleton />}>
          <LoanDetailsLink params={params} />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}

async function LoanDetailsLink({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BackToLink href={`/loans/${id}/details`} />;
}
