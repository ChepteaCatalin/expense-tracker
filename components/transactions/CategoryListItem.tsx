import { categoryIcons } from "@/utils/category-icons";
import type { TransactionCategoryListItem } from "@/types/transaction";
import { readableCurrency } from "@/utils/currency";
import Link from "next/link";
import type {
  SortTransactionBy,
  TransactionCategoriesSearchParams,
} from "@/types/transaction";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function CategoryListItem({
  type,
  category,
  currency,
  searchParams,
}: {
  type: "expenses" | "incomes";
  category: TransactionCategoryListItem;
  currency: string;
  searchParams: TransactionCategoriesSearchParams;
}) {
  const Icon = categoryIcons.find(
    (icon) => icon.src === category.icon,
  )?.Component;

  return (
    <Link
      href={{
        pathname: `/${type}/category/${category.id}`,
        query: {
          ...searchParams,
          sortBy: "date" satisfies SortTransactionBy,
        } as Record<string, string | string[]>,
      }}
    >
      <Card
        role="button"
        className="hover:bg-foreground/8 hover:ring-foreground/20 transition-all duration-150 ease-out [--card-spacing:--spacing(2.5)] hover:-translate-y-0.5 hover:shadow-lg"
      >
        <CardContent className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-nowrap items-center gap-2">
            {Icon && (
              <Icon
                className="h-8 w-8 flex-none rounded-full p-0.75 text-[32px]"
                style={{
                  backgroundColor: category.backgroundColor,
                  fill: category.strokeColor,
                }}
              />
            )}
            <p
              title={category.name}
              className="text-foreground min-w-0 overflow-hidden font-semibold text-ellipsis whitespace-nowrap"
            >
              {category.name}
            </p>
          </div>
          <div className="flex flex-none flex-nowrap items-center gap-2.5">
            <Badge variant="outline">{category.percentage.toFixed(2)}%</Badge>
            <p className="text-primary-light font-bold whitespace-nowrap">
              {`${readableCurrency(category.amount)} ${currency}`}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
