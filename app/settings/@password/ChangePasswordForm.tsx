import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function ChangePasswordForm() {
  return (
    <Stack spacing={3} p={1}>
      <TextField label="Current Password" type="password" />
      <TextField label="New Password" type="password" />
      <TextField label="Confirm New Password" type="password" />
      <Divider />
      <Button variant="contained">Change Password</Button>
    </Stack>
  );
}
