'use client';

import DeleteDialog from '@/components/DeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { startTransition, useActionState, useState } from 'react';
import { deleteSavingsDeposit } from '../../../../actions';
import IconButton from '@mui/material/IconButton';

export default function DeleteDepositBtn({
  id,
  isGoalCompleted,
}: {
  id: number;
  isGoalCompleted: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    deleteSavingsDeposit,
    '',
  );

  return (
    <>
      <IconButton
        size="small"
        aria-label="delete"
        disabled={isGoalCompleted}
        onClick={() => setOpen(true)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <DeleteDialog
        open={open}
        type="deposit"
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
