import { type FormDateTime } from '@/lib/MuiDatePicker/types';
import { type CurrencyOption } from './currency';
import { type FormErrors } from './form';

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
  initialAmount: number | '';
  targetAmount: number | '';
  currency: CurrencyOption;
  startDate: FormDateTime;
  notes: string;
}

export interface SavingsGoalFormValuesWithId extends SavingsGoalFormValues {
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
  amount: number | '';
  date: FormDateTime;
  notes: string;
}

export interface SavingsDepositFormValuesWithGoalId extends SavingsDepositFormValues {
  goalId: number;
}

export type SavingsDepositFormErrors = FormErrors<SavingsDepositFormValues>;
