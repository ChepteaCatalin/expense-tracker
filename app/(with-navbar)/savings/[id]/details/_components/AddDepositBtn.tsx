'use client';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddEditDepositDialog from './AddEditDepositDialog';

export default function AddDepositBtn({
  id,
  currency,
}: {
  id: number;
  currency?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        fullWidth
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
