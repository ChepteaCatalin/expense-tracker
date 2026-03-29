'use client';

import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

declare module '@mui/material/styles' {
  interface TypeText {
    pale: string;
  }
}

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
    text: {
      pale: 'rgb(227, 227, 227)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontSize: '1rem' },
      },
    },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiDatePicker: {
      defaultProps: {
        format: 'DD MMMM YYYY',
        slotProps: { textField: { size: 'small' } },
      },
    },
  },
});

export default theme;
