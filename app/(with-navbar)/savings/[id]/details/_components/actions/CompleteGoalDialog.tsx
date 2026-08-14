"use client";

import Button from "@mui/material/Button";
import {
  startTransition,
  useId,
  useState,
  useActionState,
  useEffect,
} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DialogContent from "@mui/material/DialogContent";
import ApiFormErrorAlert from "@/components/ApiFormErrorAlert";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { completeSavingsGoal } from "../../../../actions";

export function CompleteGoalDialog({
  id,
  handleClose,
}: {
  id: number;
  handleClose: () => void;
}) {
  const [error, completeGoalAction, isPending] = useActionState(
    completeSavingsGoal,
    "",
  );

  const titleId = useId();
  const contentId = useId();
  const [hideError, setHideError] = useState(false);

  useEffect(
    function closeOnSuccess() {
      if (!isPending && error === undefined) handleClose();
    },
    [isPending, error, handleClose],
  );

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby={titleId}
      aria-describedby={contentId}
    >
      <DialogTitle id={titleId}>Complete Goal</DialogTitle>
      <Divider />
      <DialogContent id={contentId}>
        <ApiFormErrorAlert message={error} hide={hideError} sx={{ mb: 2 }} />
        <DialogContentText>
          Are you sure you want to mark this goal as completed?
        </DialogContentText>
        <DialogContentText>
          While the goal is completed, you won’t be able to make any changes to
          it.
        </DialogContentText>
        <DialogContentText>
          You can reopen it later if needed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            setHideError(true);
            startTransition(() => {
              setHideError(false);
              completeGoalAction(id);
            });
          }}
          variant="contained"
          loadingPosition="start"
          loading={isPending}
        >
          Complete Goal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
