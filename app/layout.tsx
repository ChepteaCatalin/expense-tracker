import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// import CssBaseline from "@mui/material/CssBaseline";
import DatePickerProvider from "@/lib/MuiDatePicker/DatePickerProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "@/lib/dayjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Manage your finances with ease",
  appleWebApp: { title: "Expense Tracker" },
};

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppRouterCacheProvider>
            <MuiThemeProvider theme={theme}>
              {/* <CssBaseline /> */}
              <DatePickerProvider>{children}</DatePickerProvider>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
