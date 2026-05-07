'use client';

import DeleteDialog from '@/components/DeleteDialog';
import Button from '@mui/material/Button';
import { startTransition, useActionState, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams } from 'next/navigation';
import { DeleteTransactionAction, TransactionType } from '@/types/transaction';

interface DeleteTransactionProps {
  id: number;
  type: TransactionType;
  action: DeleteTransactionAction;
}

export default function DeleteTransaction({
  id,
  type,
  action,
}: DeleteTransactionProps) {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    action.bind(null, searchParams.toString()),
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
        type={type}
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
