import MuiFab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Fab() {
  return (
    <MuiFab
      color="primary"
      aria-label="add"
      sx={{
        position: 'absolute',
        bottom: 102,
        right: 10,
      }}
    >
      <AddIcon sx={{ fontSize: 28 }} />
    </MuiFab>
  );
}
