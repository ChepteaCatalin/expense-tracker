'use client';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import AddEditDepositDialog from './AddEditDepositDialog';
import type { SavingsDeposit } from '@/types/savings';

export default function EditDepositBtn({
  deposit,
  goalId,
  isGoalCompleted,
  goalCurrency,
}: {
  deposit: SavingsDeposit;
  goalId: number;
  isGoalCompleted: boolean;
  goalCurrency: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        size="small"
        aria-label="edit"
        disabled={isGoalCompleted}
        onClick={() => setOpen(true)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      {open && (
        <AddEditDepositDialog
          goalId={goalId}
          deposit={deposit}
          currency={goalCurrency}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
