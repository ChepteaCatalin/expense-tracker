import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/lib/dayjs";
import "@/lib/date-fns";
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
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
