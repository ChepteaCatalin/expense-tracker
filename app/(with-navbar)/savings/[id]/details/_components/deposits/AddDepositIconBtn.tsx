'use client';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddEditDepositDialog from './AddEditDepositDialog';

export default function AddDepositIconBtn({
  id,
  isGoalCompleted,
  goalCurrency,
}: {
  id: number;
  isGoalCompleted: boolean;
  goalCurrency: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        size="small"
        aria-label="add"
        disabled={isGoalCompleted}
        color="primary"
        onClick={() => setOpen(true)}
      >
        <AddIcon fontSize="small" />
      </IconButton>
      {open && (
        <AddEditDepositDialog
          goalId={id}
          currency={goalCurrency}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
