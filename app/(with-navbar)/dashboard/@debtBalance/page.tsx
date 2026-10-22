import { getValidNormalizedSearchParams } from "../search-params";
import InsightCard from "../_components/InsightCard";
import type {
  CurrencySeriesChartData,
  DashboardSearchParams,
} from "@/types/dashboard";
import DebtBalanceChart from "./DebtBalanceChart";
import { getDebtBalanceChartData } from "@/data/dashboard";
import { UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import NoData from "../_components/NoData";

export default async function DebtBalancePage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var chartData: CurrencySeriesChartData;
  try {
    chartData = await getDebtBalanceChartData({
      from: params.from!,
      to: params.to!,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect("/signin");
    throw error;
  }

  if (chartData.series.length === 0) {
    return (
      <NoData
        title="Remaining Debt"
        link={{ href: "/loans", text: "Add Loan" }}
      />
    );
  }

  return (
    <InsightCard title="Remaining Debt">
      <DebtBalanceChart chartData={chartData} />
    </InsightCard>
  );
}
