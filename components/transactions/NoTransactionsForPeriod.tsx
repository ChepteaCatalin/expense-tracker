import Link from "next/link";
import type { TransactionByCategorySearchParams } from "@/types/transaction";
import { stringifySearchParams } from "@/utils/transactions/url";
import { capitalizeFirstLetter } from "@/utils/string";
import { Card, CardContent } from "../ui/card";
import { SearchX, Plus } from "lucide-react";
import { buttonVariants } from "../ui/button";

export default function NoTransactionsForPeriod({
  type,
  searchParams,
}: {
  type: "expenses" | "incomes";
  searchParams: TransactionByCategorySearchParams;
}) {
  return (
    <Card>
      <CardContent className="space-y-2 text-center">
        <SearchX className="text-muted-foreground mx-auto h-12 w-12" />
        <p className="font-medium">No {type} for this period</p>
        <Link
          href={`/${type}/new?${stringifySearchParams(searchParams)}`}
          className={buttonVariants({ variant: "default" })}
        >
          <Plus data-icon="inline-start" />
          Add {capitalizeFirstLetter(type)}
        </Link>
      </CardContent>
    </Card>
  );
}
