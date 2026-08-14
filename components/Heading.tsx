import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export default function Heading({
  title,
  subtitle,
  sx,
}: {
  title: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box sx={{ mb: 6, ...sx }}>
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        sx={{ fontWeight: 700 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
