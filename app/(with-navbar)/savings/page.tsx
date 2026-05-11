import Fab from '@/components/Fab';
import Box from '@mui/material/Box';
import Link from 'next/dist/client/link';

export default function SavingsPage() {
  return (
    <Box>
      {/* TODO: implement this navigation */}
      <Link href="/savings/goals/new">
        <Fab />
      </Link>
    </Box>
  );
}
