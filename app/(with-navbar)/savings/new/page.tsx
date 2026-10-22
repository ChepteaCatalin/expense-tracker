import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import GoalForm from "../_components/GoalForm/GoalForm";
import SuspenseCurrencyAutocomplete from "@/components/form/SuspenseCurrencyAutocomplete";
import SuspenseStartDateField from "@/components/form/SuspenseStartDateField";
import { BackToSavingsLink } from "../_components/BackToSavingsLink";

export const metadata = {
  title: "New Goal",
  description: "Create a savings goal",
};

export default function NewSavingGoalPage() {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<BackToSavingsLink />}
    >
      <GoalForm
        currencyAutocomplete={<SuspenseCurrencyAutocomplete />}
        startDateField={<SuspenseStartDateField />}
      />
    </TitledCardPageWrapper>
  );
}
