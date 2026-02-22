'use client';

import DeleteDialog from '@/components/DeleteDialog';
import Button from '@mui/material/Button';
import { startTransition, useActionState, useState } from 'react';
import { deleteCategory } from '../actions';

export default function DeleteCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    deleteCategory,
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
      >
        Delete category
      </Button>
      <DeleteDialog
        open={open}
        type="category"
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
