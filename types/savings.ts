export interface SavingsGoal {
  id: number;
  name: string;
  initialAmount: number;
  currentAmount: number;
  targetAmount: number;
  startDate: Date;
  completedDate?: Date;
  note?: string;
}
