import { getSession } from "@/data/auth";
import InsightCard from "../_components/InsightCard";
import TreemapChart from "../_components/TreemapChart";
import { getValidNormalizedSearchParams } from "../utils";
import type {
  CategoryTreemapNode,
  DashboardSearchParams,
} from "@/types/dashboard";
import { getIncomeCategoryTreemapData } from "@/data/dashboard";
import { UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import NoData from "../_components/NoData";
import AddIncomeLinkBtn from "../_components/AddIncomeLinkBtn";

export default async function IncomeTreemap({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var chartData: CategoryTreemapNode[];
  var session: Awaited<ReturnType<typeof getSession>> = null;
  try {
    [chartData, session] = await Promise.all([
      getIncomeCategoryTreemapData({
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

  if (chartData.length === 0) {
    return (
      <NoData title="Income by Category" customLink={<AddIncomeLinkBtn />} />
    );
  }

  return (
    <InsightCard title={`Income by Category (${currency})`}>
      <TreemapChart data={chartData} currency={currency} />
    </InsightCard>
  );
}
