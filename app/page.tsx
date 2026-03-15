import Box from '@mui/material/Box';
import Link from 'next/link';

export default async function RootPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Box>
        <Link href="/settings">Go to settings</Link>
      </Box>
      <Box>
        <Link href="/categories/all?type=expense">Go to category</Link>
      </Box>
    </div>
  );
}
