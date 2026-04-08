import Box from '@mui/material/Box';
import NavBar from '@/components/NavBar/NavBar';

export default function WithNavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box component="main" sx={{ py: 4, px: 3, mb: 11.25 }}>
      {children}
      <NavBar />
    </Box>
  );
}
