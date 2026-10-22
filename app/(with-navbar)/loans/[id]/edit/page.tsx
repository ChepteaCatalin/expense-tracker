import { getLoanById } from "@/data/loans";
import type { Loan } from "@/types/loans";
import { UnauthorizedError } from "@/utils/error";
import { notFound, redirect } from "next/navigation";
import LoanForm from "../../_components/LoanForm";
import SuspenseCurrencyAutocomplete from "@/components/form/SuspenseCurrencyAutocomplete";
import SuspenseStartDateField from "@/components/form/SuspenseStartDateField";
import { validIdParam } from "@/utils/url";
import { currencies } from "@/data/currency";
import type { CurrencyOption } from "@/types/currency";
import { calendarDay } from "@/utils/date";

export default async function EditLoanPage({
  params,
}: PageProps<"/loans/[id]/edit">) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  var loan: Loan | null = null;
  try {
    loan = await getLoanById(+id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    throw err;
  }
  if (!loan) notFound();

  const defaultCurrency: CurrencyOption | undefined = currencies.find(
    (c) => c.code === loan?.currency,
  );

  return (
    <LoanForm
      loan={loan}
      currencyAutocomplete={<SuspenseCurrencyAutocomplete isEditMode />}
      startDateField={
        <SuspenseStartDateField
          isEditMode
          maxDate={loan.firstPaymentDate && calendarDay(loan.firstPaymentDate)}
        />
      }
      defaultCurrency={defaultCurrency}
    />
  );
}
