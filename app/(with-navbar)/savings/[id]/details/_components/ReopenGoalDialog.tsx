'use client';

import Button from '@mui/material/Button';
import { startTransition, useId, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useActionState, useEffect } from 'react';
import { reopenSavingsGoal } from '../../../actions';

export function ReopenGoalDialog({
  id,
  handleClose,
}: {
  id: number;
  handleClose: () => void;
}) {
  const [error, reopenGoalAction, isPending] = useActionState(
    reopenSavingsGoal,
    '',
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
      <DialogTitle id={titleId}>Reopen Goal</DialogTitle>
      <Divider />
      <DialogContent id={contentId}>
        <ApiFormErrorAlert message={error} hide={hideError} sx={{ mb: 2 }} />
        <DialogContentText>
          Are you sure you want to reopen this goal?
        </DialogContentText>
        <DialogContentText>
          While the goal is reopened, you will be able to make changes to it.
        </DialogContentText>
        <DialogContentText>
          You can complete it later if needed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            setHideError(true);
            startTransition(() => {
              setHideError(false);
              reopenGoalAction(id);
            });
          }}
          variant="contained"
          loadingPosition="start"
          loading={isPending}
        >
          Reopen Goal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
