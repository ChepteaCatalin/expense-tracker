import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import DatePickerProvider from "@/lib/MuiDatePicker/DatePickerProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "@/lib/dayjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Manage your finances with ease",
  appleWebApp: { title: "Expense Tracker" },
};
export const viewport: Viewport = { viewportFit: "cover" };

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppRouterCacheProvider>
            <MuiThemeProvider theme={theme}>
              <DatePickerProvider>{children}</DatePickerProvider>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
