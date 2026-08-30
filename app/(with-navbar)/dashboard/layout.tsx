import Heading from "@/components/Heading";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const metadata = {
  title: "Dashboard",
  description: "View your financial overview and insights.",
};

export default function DashboardLayout({
  period,
  totals,
  netIncome,
  expensesBreakdown,
  incomeBreakdown,
  savings,
  expensesTreemap,
  incomeTreemap,
}: {
  period: React.ReactNode;
  totals: React.ReactNode;
  netIncome: React.ReactNode;
  expensesBreakdown: React.ReactNode;
  incomeBreakdown: React.ReactNode;
  savings: React.ReactNode;
  expensesTreemap: React.ReactNode;
  incomeTreemap: React.ReactNode;
}) {
  return (
    <Box>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {period}
        <Grid size={{ xs: 12, md: 4 }}>{totals}</Grid>
        <Grid size={{ xs: 12, md: 8 }}>{netIncome}</Grid>
        <Grid size={12}>{expensesBreakdown}</Grid>
        <Grid size={12}>{incomeBreakdown}</Grid>
        <Grid size={12}>{savings}</Grid>
        <Grid size={12}>{expensesTreemap}</Grid>
        <Grid size={12}>{incomeTreemap}</Grid>
      </Grid>
    </Box>
  );
}
