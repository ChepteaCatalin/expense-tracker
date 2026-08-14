import { notFound, redirect } from "next/navigation";
import { validIdParam } from "@/utils/url";
import type { SavingsDeposit, SavingsGoal } from "@/types/savings";
import { UnauthorizedError } from "@/utils/error";
import { getSavingsDepositsByGoalId, getSavingsGoalById } from "@/data/savings";
import Stack from "@mui/material/Stack";
import SavingsGoalCard from "../../_components/SavingsGoalCard";
import ActionsButtons from "./_components/actions/ActionsButtons";
import { BackToSavingsLink } from "../../_components/BackToSavingsLink";
import SavingsDeposits from "./_components/deposits/SavingsDeposits";

export default async function SavingsGoalDetailsPage({
  params,
}: PageProps<"/savings/[id]/details">) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  let goal: SavingsGoal | null = null;
  let deposits: SavingsDeposit[] = [];
  try {
    [goal, deposits] = await Promise.all([
      getSavingsGoalById(+id),
      getSavingsDepositsByGoalId(+id),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    notFound();
  }

  if (!goal) notFound();

  return (
    <>
      <BackToSavingsLink />
      <Stack spacing={3}>
        <SavingsGoalCard goal={goal} noHoverEffects />
        <ActionsButtons goal={goal} />
        <SavingsDeposits
          deposits={deposits}
          isGoalCompleted={goal.isCompleted}
          goalId={goal.id}
          goalCurrency={goal.currency}
        />
      </Stack>
    </>
  );
}
