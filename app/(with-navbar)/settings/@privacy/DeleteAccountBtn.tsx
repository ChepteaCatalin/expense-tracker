"use client";

import DeleteDialog from "@/components/DeleteDialog";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { startTransition, useActionState, useState } from "react";
import { deleteAccount } from "../actions";

export default function DeleteAccountBtn() {
  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAccountAction, isPending] = useActionState(
    deleteAccount,
    "",
  );

  return (
    <>
      <Button
        variant="contained"
        color="error"
        fullWidth
        startIcon={<DeleteForeverIcon />}
        onClick={() => setOpen(true)}
      >
        Delete Account
      </Button>
      <DeleteDialog
        open={open}
        type="account"
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
            deleteAccountAction();
          });
        }}
      />
    </>
  );
}
