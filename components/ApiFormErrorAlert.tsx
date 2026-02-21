import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function ApiFormErrorAlert({
  message,
  hide,
  sx,
}: {
  message?: string;
  hide?: boolean;
  sx?: object;
}) {
  if (!message || hide) return null;

  return (
    <Box width="100%" sx={sx}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
