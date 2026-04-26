import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import DatePickerProvider from '@/lib/MuiDatePicker/DatePickerProvider';
import '@/lib/dayjs';

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Manage your finances with ease',
  appleWebApp: {
    title: 'Expense Tracker',
    capable: true,
  },
  icons: {
    apple: '/web-app-manifest-192x192.png',
  },
};

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DatePickerProvider>{children}</DatePickerProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
