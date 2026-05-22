import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

export default function PageWrapper({ sx, children }: BoxProps) {
  return (
    <Box
      sx={[
        { boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
