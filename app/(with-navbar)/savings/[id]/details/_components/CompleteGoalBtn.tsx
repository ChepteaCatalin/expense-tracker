'use client';

import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { CompleteGoalDialog } from './CompleteGoalDialog';

export default function CompleteGoalBtn({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<CheckIcon />}
        fullWidth
        onClick={() => setOpen(true)}
      >
        Complete Goal
      </Button>
      {open && (
        <CompleteGoalDialog id={id} handleClose={() => setOpen(false)} />
      )}
    </>
  );
}
