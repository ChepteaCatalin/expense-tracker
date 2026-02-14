import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function ApiFormErrorAlert({
  message,
  hide,
}: {
  message?: string;
  hide?: boolean;
}) {
  if (!message || hide) return null;

  return (
    <Box width="100%" mb={1.5}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
