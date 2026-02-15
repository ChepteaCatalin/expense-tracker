'use client';

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { startTransition, useActionState, useState } from 'react';
import { signOut } from '../actions';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function SignOutBtn() {
  const [signOutUserError, signOutUserAction, isSignOutUserPending] =
    useActionState(signOut, null);

  const [hideAlert, setHideAlert] = useState(false);

  return (
    <Box>
      {!!signOutUserError && !hideAlert && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to sign out
        </Alert>
      )}
      <Button
        variant="contained"
        color="error"
        fullWidth
        endIcon={<LogoutIcon />}
        loading={isSignOutUserPending}
        loadingPosition="start"
        onClick={() => {
          setHideAlert(true);
          startTransition(() => {
            setHideAlert(false);
            signOutUserAction();
          });
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
}
