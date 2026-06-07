import MuiFab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Fab() {
  return (
    <MuiFab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 77,
        right: 10,
        '@media (pointer: fine)': { bottom: 100 },
      }}
    >
      <AddIcon sx={{ fontSize: 28 }} />
    </MuiFab>
  );
}
