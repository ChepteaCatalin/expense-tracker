'use client';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddEditDepositDialog from '../deposits/AddEditDepositDialog';

export default function AddDepositBtn({
  id,
  currency,
  disabled,
}: {
  id: number;
  currency?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        fullWidth
        disabled={disabled}
      >
        Add Deposit
      </Button>
      {open && (
        <AddEditDepositDialog
          goalId={id}
          currency={currency}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
