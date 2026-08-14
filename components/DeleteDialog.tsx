"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { useId } from "react";
import ApiFormErrorAlert from "./ApiFormErrorAlert";

interface DeleteDialogProps {
  open: boolean;
  type: string;
  name?: string;
  isPending: boolean;
  error: string;
  hideError: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export default function DeleteDialog({
  open,
  type,
  name,
  isPending,
  error,
  hideError,
  handleClose,
  handleDelete,
}: DeleteDialogProps) {
  const titleId = useId();
  const contentId = useId();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={titleId}
      aria-describedby={contentId}
    >
      <DialogTitle id={titleId}>Confirm {type} deletion</DialogTitle>
      <Divider />
      <DialogContent>
        <ApiFormErrorAlert message={error} hide={hideError} sx={{ mb: 2 }} />
        <DialogContentText id={contentId}>
          Are you sure you want to delete {name ? <b>{`"${name}" `}</b> : ""}
          {type}? <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          loadingPosition="start"
          loading={isPending}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
