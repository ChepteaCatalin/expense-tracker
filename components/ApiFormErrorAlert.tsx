import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

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
    <Box sx={{ width: "100%", ...sx }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
