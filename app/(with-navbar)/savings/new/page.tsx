import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import Link from 'next/link';
import GoalForm from '../_components/GoalForm/GoalForm';
import SuspenseCurrencyAutocomplete from '../_components/GoalForm/SuspenseCurrencyAutocomplete';
import SuspenseStartDateField from '../_components/GoalForm/SuspenseStartDateField';

export const metadata = {
  title: 'New Goal',
  description: 'Create a savings goal',
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

function BackToSavingsLink() {
  return (
    <Link href="/savings">
      <Button
        sx={{
          py: 0,
          px: 0.5,
          '& .MuiButton-startIcon': { mr: 0.5 },
          mb: 0.5,
        }}
        startIcon={<ChevronLeftIcon />}
      >
        Savings
      </Button>
    </Link>
  );
}
