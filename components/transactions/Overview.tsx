import type { TransactionByCategorySearchParams } from "@/types/transaction";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { parsePeriod } from "@/utils/transactions/url";
import { readableCurrency } from "@/utils/currency";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { getSession } from "@/data/auth";

export default async function Overview({
  searchParams,
  categoryName,
  categoryTotal,
}: {
  searchParams: TransactionByCategorySearchParams;
  categoryName: string | undefined;
  categoryTotal: number;
}) {
  const currency = (await getSession())?.user.currency;
  const period = parsePeriod(
    new URLSearchParams(
      Object.entries(searchParams).flatMap(([key, value]) =>
        typeof value === "string" ? [[key, value]] : [],
      ),
    ) as unknown as ReadonlyURLSearchParams,
  );

  return (
    <Card className="from-primary/12 via-card to-card ring-primary/20 before:from-primary/30 after:via-primary/50 dark:from-primary/25 dark:ring-foreground/10 dark:before:from-primary/40 relative mb-6 overflow-hidden rounded-2xl bg-linear-145 via-50% py-0 shadow-lg shadow-black/10 before:pointer-events-none before:absolute before:-top-24 before:-right-24 before:size-56 before:rounded-full before:bg-radial before:to-transparent before:to-70% before:blur-2xl after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-linear-to-r after:from-transparent after:to-transparent dark:shadow-black/40">
      <CardContent className="relative p-6">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
          Category overview
        </p>
        <p
          title={categoryName}
          className="mt-2 truncate text-2xl leading-8 font-bold tracking-tight"
        >
          {categoryName}
        </p>
        <Badge
          variant="outline"
          className="border-primary/25 bg-background/60 text-muted-foreground dark:bg-background/30 mt-2 tabular-nums backdrop-blur-sm"
        >
          {period}
        </Badge>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
          <span className="text-5xl leading-none font-extrabold tracking-tight tabular-nums">
            {readableCurrency(categoryTotal)}
          </span>
          <span className="text-muted-foreground text-xl leading-none font-medium">
            {currency}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
