export interface SavingsGoal {
  id: number;
  name: string;
  initialAmount: number;
  currentAmount: number;
  targetAmount: number;
  startDate: Date;
  isCompleted: boolean;
  completedDate?: Date;
  note?: string;
  currency: string;
}

export interface SavingsGoalFormValues {
  name: string;
  initialAmount: number;
}
