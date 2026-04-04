'use client';

import MuiFab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Fab() {
  const isDesktop = useMediaQuery('(pointer: fine)');

  return (
    <MuiFab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: isDesktop ? 100 : 81,
        right: 10,
      }}
    >
      <AddIcon sx={{ fontSize: 28 }} />
    </MuiFab>
  );
}
