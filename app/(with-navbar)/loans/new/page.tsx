import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import LoanForm from "../_components/LoanForm";
import SuspenseCurrencyAutocomplete from "@/components/form/SuspenseCurrencyAutocomplete";
import SuspenseStartDateField from "@/components/form/SuspenseStartDateField";
import { BackToLoansLink } from "../_components/BackToLoansLink";

export const metadata = {
  title: "New Loan",
  description: "Add a debt you owe",
};

export default function NewLoanPage() {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<BackToLoansLink />}
    >
      <LoanForm
        currencyAutocomplete={<SuspenseCurrencyAutocomplete />}
        startDateField={<SuspenseStartDateField />}
      />
    </TitledCardPageWrapper>
  );
}
