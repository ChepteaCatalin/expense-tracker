'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: { fontFamily: 'var(--font-geist)' },
  palette: {
    mode: 'dark',
    primary: { main: '#1ED760' },
    background: {
      default: '#121212',
      paper: '#212121',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontSize: '1rem' },
      },
    },
    MuiTextField: { defaultProps: { size: 'small' } },
  },
});

export default theme;
