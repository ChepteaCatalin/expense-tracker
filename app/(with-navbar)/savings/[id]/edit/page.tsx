import { getSavingsGoalById } from "@/data/savings";
import type { SavingsGoal } from "@/types/savings";
import { UnauthorizedError } from "@/utils/error";
import { notFound, redirect } from "next/navigation";
import GoalForm from "../../_components/GoalForm/GoalForm";
import SuspenseCurrencyAutocomplete from "../../_components/GoalForm/SuspenseCurrencyAutocomplete";
import SuspenseStartDateField from "../../_components/GoalForm/SuspenseStartDateField";
import { validIdParam } from "@/utils/url";
import { currencies } from "@/data/currency";
import type { CurrencyOption } from "@/types/currency";

export default async function EditSavingsGoalPage({
  params,
}: PageProps<"/savings/[id]/edit">) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  var goal: SavingsGoal | null = null;
  try {
    goal = await getSavingsGoalById(+id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    throw err;
  }
  if (!goal) notFound();

  const defaultCurrency: CurrencyOption | undefined = currencies.find(
    (c) => c.code === goal?.currency,
  );

  return (
    <GoalForm
      goal={goal}
      currencyAutocomplete={<SuspenseCurrencyAutocomplete isEditMode />}
      startDateField={<SuspenseStartDateField isEditMode />}
      defaultCurrency={defaultCurrency}
    />
  );
}
