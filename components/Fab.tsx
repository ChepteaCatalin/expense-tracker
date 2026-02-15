'use client';

import MuiFab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Fab() {
  const notMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <MuiFab
      color="primary"
      aria-label="add"
      sx={{
        position: 'absolute',
        bottom: notMobile ? 100 : 81,
        right: 10,
      }}
    >
      <AddIcon sx={{ fontSize: 28 }} />
    </MuiFab>
  );
}
