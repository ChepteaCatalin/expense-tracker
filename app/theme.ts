'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  typography: { fontFamily: 'var(--font-geist)' },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1ED760',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#1ED760',
        },
        background: {
          default: '#121212',
          paper: '#212121',
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});

export default theme;
