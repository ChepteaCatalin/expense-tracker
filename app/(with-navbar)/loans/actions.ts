"use server";

import type {
  LoanFormErrors,
  LoanFormValues,
  LoanFormValuesWithId,
  LoanPaymentFormErrors,
  LoanPaymentFormValuesWithId,
  LoanPaymentFormValuesWithLoanId,
} from "@/types/loans";
import { loanPaymentSchema, loanSchema } from "./validation";
import { parseForm } from "@/lib/zod";
import { RuleViolationError, UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import {
  createLoan as createNewLoan,
  updateLoan as updateExistingLoan,
  deleteLoan as deleteExistingLoan,
  createLoanPayment as createNewLoanPayment,
  updateLoanPayment as updateExistingLoanPayment,
  deleteLoanPayment as deleteExistingLoanPayment,
} from "@/data/loans";
import { toCents } from "@/utils/currency";

export async function createLoan(
  _: LoanFormErrors,
  loan: LoanFormValues,
): Promise<LoanFormErrors> {
  const result = parseForm(loanSchema(), {
    ...loan,
    amount: +loan.amount,
    startDate: String(loan.startDate),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await createNewLoan({ ...data, amount: toCents(data.amount) });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to create the loan" };
  }

  redirect("/loans");
}

export async function updateLoan(
  _: LoanFormErrors,
  loan: LoanFormValuesWithId,
): Promise<LoanFormErrors> {
  const result = parseForm(loanSchema(), {
    ...loan,
    amount: +loan.amount,
    startDate: String(loan.startDate),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await updateExistingLoan({
      ...data,
      id: loan.id,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    if (err instanceof RuleViolationError) return { api: err.message };
    return { api: "Failed to update the loan" };
  }

  redirect(`/loans/${loan.id}/details`);
}

export async function deleteLoan(_: string, id: number): Promise<string> {
  try {
    await deleteExistingLoan(id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to delete the loan";
  }

  redirect("/loans");
}

export async function createLoanPayment(
  _: LoanPaymentFormErrors,
  payment: LoanPaymentFormValuesWithLoanId,
): Promise<LoanPaymentFormErrors> {
  const result = parseForm(loanPaymentSchema(), {
    ...payment,
    amount: +payment.amount,
    date: String(payment.date),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await createNewLoanPayment({
      ...data,
      loanId: payment.loanId,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    if (err instanceof RuleViolationError) return { api: err.message };
    return { api: "Failed to add the payment" };
  }

  return {};
}

export async function updateLoanPayment(
  _: LoanPaymentFormErrors,
  payment: LoanPaymentFormValuesWithId,
): Promise<LoanPaymentFormErrors> {
  const result = parseForm(loanPaymentSchema(), {
    ...payment,
    amount: +payment.amount,
    date: String(payment.date),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await updateExistingLoanPayment({
      ...data,
      id: payment.id,
      loanId: payment.loanId,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    if (err instanceof RuleViolationError) return { api: err.message };
    return { api: "Failed to update the payment" };
  }

  return {};
}

export async function deleteLoanPayment(
  _: string,
  id: number,
): Promise<string> {
  try {
    await deleteExistingLoanPayment(id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to delete the payment";
  }

  return "";
}
