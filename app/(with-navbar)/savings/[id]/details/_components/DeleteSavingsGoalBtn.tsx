'use client';

import DeleteDialog from '@/components/DeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useActionState, useState, startTransition } from 'react';
import { deleteSavingsGoal } from '../../../actions';

export default function DeleteSavingsGoalBtn({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    deleteSavingsGoal,
    '',
  );

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        fullWidth
        onClick={() => setOpen(true)}
      >
        Delete Goal
      </Button>
      <DeleteDialog
        open={open}
        type="goal"
        name={name}
        isPending={isPending}
        error={actionError}
        hideError={hideError}
        handleClose={() => {
          setOpen(false);
          setHideError(true);
        }}
        handleDelete={() => {
          setHideError(true);
          startTransition(() => {
            setHideError(false);
            deleteAction(id);
          });
        }}
      />
    </>
  );
}
