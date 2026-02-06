import logo from '@/public/logo.png';
import Image from 'next/image';
import Grid from '@mui/material/Grid';

export default function Logo() {
  return (
    <Grid container flexDirection="column" alignItems="center" mb={2}>
      <Image
        src={logo}
        alt="Expense Tracker Logo"
        sizes="100vw"
        style={{
          width: '150px',
          height: 'auto',
          borderRadius: '50%',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </Grid>
  );
}
