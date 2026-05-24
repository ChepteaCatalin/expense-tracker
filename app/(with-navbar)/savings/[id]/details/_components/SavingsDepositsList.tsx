import { getSavingsDepositsByGoalId } from '@/data/savings';
import type { SavingsDeposit } from '@/types/savings';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import NoSavingsDeposits from './NoSavingsDeposits';

export default async function SavingsDepositsList({
  goalId,
  isCompleted,
}: {
  goalId: number;
  isCompleted: boolean;
}) {
  let deposits: SavingsDeposit[] = [];
  try {
    deposits = await getSavingsDepositsByGoalId(goalId);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  if (!deposits.length) return <NoSavingsDeposits />;
}
