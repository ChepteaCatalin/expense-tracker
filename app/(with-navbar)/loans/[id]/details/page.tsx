import { notFound, redirect } from "next/navigation";
import { validIdParam } from "@/utils/url";
import type { Loan, LoanPayment } from "@/types/loans";
import { UnauthorizedError } from "@/utils/error";
import { getLoanById, getLoanPaymentsByLoanId } from "@/data/loans";
import LoanCard from "../../_components/LoanCard";
import ActionsButtons from "./_components/actions/ActionsButtons";
import { BackToLoansLink } from "../../_components/BackToLoansLink";
import LoanPayments from "./_components/payments/LoanPayments";

export default async function LoanDetailsPage({
  params,
}: PageProps<"/loans/[id]/details">) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  let loan: Loan | null = null;
  let payments: LoanPayment[] = [];
  try {
    [loan, payments] = await Promise.all([
      getLoanById(+id),
      getLoanPaymentsByLoanId(+id),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    notFound();
  }

  if (!loan) notFound();

  return (
    <>
      <BackToLoansLink />
      <div className="flex flex-col gap-6">
        <LoanCard loan={loan} noHoverEffects />
        <ActionsButtons loanId={loan.id} />
        <LoanPayments loan={loan} payments={payments} />
      </div>
    </>
  );
}
