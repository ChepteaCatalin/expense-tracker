import { type CurrencyOption } from "./currency";
import { type FormErrors } from "./form";

export interface Loan {
  id: number;
  lender: string;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  currency: string;
  startDate: Date;
  isPaidOff: boolean;
  paidOffDate?: Date;
  firstPaymentDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanFormValues {
  lender: string;
  amount: number | "";
  currency: CurrencyOption | null;
  startDate: string | null;
  notes: string;
}

export interface LoanFormValuesWithId extends LoanFormValues {
  id: number;
}

export interface LoanInput {
  lender: string;
  amount: number;
  currency: CurrencyOption;
  startDate: string;
  notes: string;
}

export interface LoanInputWithId extends LoanInput {
  id: number;
}

export type LoanFormErrors = FormErrors<LoanFormValues>;

export interface LoanPayment {
  id: number;
  loanId: number;
  amount: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanPaymentFormValues {
  amount: number | "";
  date: string | null;
  notes: string;
}

export interface LoanPaymentFormValuesWithLoanId extends LoanPaymentFormValues {
  loanId: number;
}

export interface LoanPaymentFormValuesWithId extends LoanPaymentFormValues {
  id: number;
  loanId: number;
}

export type LoanPaymentFormErrors = FormErrors<LoanPaymentFormValues>;

export interface LoanPaymentInput {
  amount: number;
  date: string;
  notes: string;
}

export interface LoanPaymentInputWithLoanId extends LoanPaymentInput {
  loanId: number;
}

export interface LoanPaymentInputWithId extends LoanPaymentInput {
  id: number;
  loanId: number;
}
