import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function ApiErrorAlert({
  message,
  hide,
}: {
  message: string;
  hide: boolean;
}) {
  if (!message || hide) return null;

  return (
    <Box sx={{ width: '100%' }} mb={2}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
