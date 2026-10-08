import { type CurrencyOption } from "./currency";
import { type FormErrors } from "./form";

export interface SavingsGoal {
  id: number;
  name: string;
  initialAmount: number;
  currentAmount: number;
  targetAmount: number;
  startDate: Date;
  isCompleted: boolean;
  completedDate?: Date;
  notes?: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavingsGoalFormValues {
  name: string;
  initialAmount: number | "";
  targetAmount: number | "";
  currency: CurrencyOption | null;
  startDate: string | null;
  notes: string;
}

export interface SavingsGoalFormValuesWithId extends SavingsGoalFormValues {
  id: number;
}

export interface SavingsGoalInput {
  name: string;
  initialAmount: number;
  targetAmount: number;
  currency: CurrencyOption;
  startDate: string;
  notes: string;
}

export interface SavingsGoalInputWithId extends SavingsGoalInput {
  id: number;
}

export type SavingsGoalFormErrors = FormErrors<SavingsGoalFormValues>;

export interface SavingsDeposit {
  id: number;
  goalId: number;
  amount: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavingsDepositFormValues {
  amount: number | "";
  date: string | null;
  notes: string;
}

export interface SavingsDepositFormValuesWithGoalId extends SavingsDepositFormValues {
  goalId: number;
}

export interface SavingsDepositFormValuesWithId extends SavingsDepositFormValues {
  id: number;
  goalId: number;
}

export type SavingsDepositFormErrors = FormErrors<SavingsDepositFormValues>;

export interface SavingsDepositInput {
  amount: number;
  date: string;
  notes: string;
}

export interface SavingsDepositInputWithGoalId extends SavingsDepositInput {
  goalId: number;
}

export interface SavingsDepositInputWithId extends SavingsDepositInput {
  id: number;
  goalId: number;
}
