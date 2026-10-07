import { getValidNormalizedSearchParams } from "../utils";
import InsightCard from "../_components/InsightCard";
import type { DashboardSearchParams, TotalsMetrics } from "@/types/dashboard";
import { cn } from "cn";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/data/auth";
import { readableCurrency } from "@/utils/currency";
import { getTotals } from "@/data/dashboard";
import { UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import NoData from "../_components/NoData";
import AddExpensesLinkBtn from "../_components/AddExpensesLinkBtn";

export default async function TotalsPage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var totals: TotalsMetrics;
  var session: Awaited<ReturnType<typeof getSession>> = null;
  try {
    [totals, session] = await Promise.all([
      getTotals({
        from: params.from!,
        to: params.to!,
      }),
      getSession(),
    ]);
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect("/signin");
    throw error;
  }
  const currency = session?.user.currency;

  const netIncome = totals.income - totals.expenses;

  if (
    totals.income === 0 &&
    totals.expenses === 0 &&
    totals.savingsByCurrency?.length === 0
  ) {
    return <NoData title="Totals" customLink={<AddExpensesLinkBtn />} />;
  }

  return (
    <InsightCard title="Totals">
      <MetricRow
        label="Income"
        value={totals.income}
        currency={currency}
        className="text-primary-light"
      />
      <Separator className="my-2" />
      <MetricRow
        label="Expenses"
        value={totals.expenses}
        currency={currency}
        className="text-destructive"
      />
      <Separator className="my-2" />
      <MetricRow
        label="Net Income"
        value={netIncome}
        currency={currency}
        className={netIncome >= 0 ? "text-primary-light" : "text-destructive"}
        highlight
      />
      <Separator className="my-2" />
      {totals.savingsByCurrency.length === 0 ? (
        <MetricRow label="Savings" value={0} className="text-chart-2" />
      ) : (
        totals.savingsByCurrency.map(({ currency, total }) => (
          <MetricRow
            key={currency}
            label="Savings"
            value={total}
            currency={currency}
            className="text-chart-2"
          />
        ))
      )}
    </InsightCard>
  );
}

function MetricRow({
  label,
  value,
  currency,
  className,
  highlight,
}: {
  label: string;
  value: number;
  currency?: string;
  className: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between text-sm",
        highlight && "bg-muted rounded-sm px-2 py-1",
      )}
    >
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(highlight ? "font-bold" : "font-semibold", className)}
      >
        {readableCurrency(value)} {currency ?? ""}
      </span>
    </div>
  );
}
