import { getSession } from "@/data/auth";
import type { TransactionsByDate } from "@/types/transaction";
import { categoryIcons } from "@/utils/category-icons";
import { readableCurrency } from "@/utils/currency";
import dayjs from "dayjs";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export default async function PeriodTransactions({
  type,
  transactions,
  searchParams,
}: {
  type: "incomes" | "expenses";
  transactions: TransactionsByDate;
  searchParams: string;
}) {
  const currency = (await getSession())?.user.currency;
  const Icon = categoryIcons.find(
    (icon) => icon.src === transactions.icon,
  )?.Component;

  return (
    <div>
      <p className="text-muted-foreground mb-0.5 ml-2 text-sm font-semibold">
        {dayjs(transactions.date).format("D MMMM YYYY")}
      </p>
      <Card
        role="button"
        className="hover:bg-foreground/8 hover:ring-foreground/20 transition-all duration-150 ease-out [--card-spacing:--spacing(2.5)] hover:-translate-y-0.5 hover:shadow-lg"
      >
        <CardContent>
          <div className="space-x-2">
            {transactions.transactions.map((transactionItem) => (
              <div key={transactionItem.id}>
                <Link
                  href={`/${type}/${transactionItem.id}/edit?${searchParams}`}
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <div className="flex flex-nowrap items-center justify-between gap-4">
                      <div className="flex min-w-0 flex-nowrap items-center gap-2">
                        {Icon && (
                          <Icon
                            className="h-8 w-8 flex-none rounded-full p-0.75 text-[32px]"
                            style={{
                              backgroundColor: transactions.backgroundColor,
                              fill: transactions.strokeColor,
                            }}
                          />
                        )}
                        <p
                          title={transactions.categoryName}
                          className="text-foreground min-w-0 truncate font-semibold"
                        >
                          {transactions.categoryName}
                        </p>
                      </div>
                      <p className="text-primary-light font-bold whitespace-nowrap">
                        {`${readableCurrency(transactionItem.amount)} ${currency}`}
                      </p>
                    </div>
                    <p className="text-muted-foreground mt-0.5 text-[0.8125rem]">
                      {transactionItem.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
