import { type TransactionByCategorySearchParams } from "@/types/transaction";
import { getCategoryNameById } from "@/data/category";
import { notFound, redirect } from "next/navigation";
import { UnauthorizedError } from "@/utils/error";
import {
  dateFromSearchParams,
  notFoundOnInvalidParams,
} from "@/utils/transactions/url";
import { getIncomeCategoryTotal } from "@/data/income";
import Overview from "@/components/transactions/Overview";

export default async function CategoryIncomesOverview({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<TransactionByCategorySearchParams>;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  notFoundOnInvalidParams(awaitedParams, awaitedSearchParams);

  var categoryName: string | undefined = undefined;
  var categoryTotal: number = 0;
  try {
    [categoryName, categoryTotal] = await Promise.all([
      getCategoryNameById(+awaitedParams.id),
      getIncomeCategoryTotal({
        categoryId: awaitedParams.id,
        ...dateFromSearchParams(awaitedSearchParams),
      }),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
  }
  if (!categoryName) notFound();

  return (
    <Overview
      searchParams={awaitedSearchParams}
      categoryName={categoryName}
      categoryTotal={categoryTotal}
    />
  );
}
