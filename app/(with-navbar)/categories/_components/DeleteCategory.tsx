'use client';

import DeleteDialog from '@/components/DeleteDialog';
import Button from '@mui/material/Button';
import { startTransition, useActionState, useState } from 'react';
import { deleteCategory } from '../actions';
import { type CategoryType } from '@/types/category';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteCategory({
  id,
  type,
  name,
}: {
  id: number;
  type: CategoryType;
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
        startIcon={<DeleteIcon />}
      >
        Delete
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
            deleteAction({ id, type });
          });
        }}
      />
    </>
  );
}
