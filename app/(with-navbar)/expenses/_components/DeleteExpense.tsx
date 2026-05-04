'use client';

import DeleteDialog from '@/components/DeleteDialog';
import Button from '@mui/material/Button';
import { startTransition, useActionState, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteExpense } from '../actions';
import { useSearchParams } from 'next/navigation';

export default function DeleteExpense({ id }: { id: number }) {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    deleteExpense.bind(null, searchParams.toString()),
    '',
  );

  return (
    <>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 3 }}
        onClick={() => setOpen(true)}
        fullWidth
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <DeleteDialog
        open={open}
        type="this expense"
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
            deleteAction({ id });
          });
        }}
      />
    </>
  );
}
