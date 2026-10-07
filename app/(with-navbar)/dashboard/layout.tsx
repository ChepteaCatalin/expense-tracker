import Heading from "@/components/Heading";

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
    <div>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">{period}</div>
        <div className="col-span-12 min-w-0 md:col-span-4">{totals}</div>
        <div className="col-span-12 min-w-0 md:col-span-8">{netIncome}</div>
        <div className="col-span-12 min-w-0">{expensesBreakdown}</div>
        <div className="col-span-12 min-w-0">{incomeBreakdown}</div>
        <div className="col-span-12 min-w-0">{savings}</div>
        <div className="col-span-12 min-w-0">{expensesTreemap}</div>
        <div className="col-span-12 min-w-0">{incomeTreemap}</div>
      </div>
    </div>
  );
}
