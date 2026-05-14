import { type FormDateTime } from '@/lib/MuiDatePicker/types';
import { type CurrencyOption } from './currency';

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
}

export interface SavingsGoalFormValues {
  name: string;
  initialAmount: number;
  targetAmount: number | '';
  currency: CurrencyOption;
  startDate: FormDateTime;
  notes: string;
}
