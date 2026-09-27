import { getSession } from "@/data/auth";
import type { TransactionsByDate } from "@/types/transaction";
import { categoryIcons } from "@/utils/category-icons";
import { readableCurrency } from "@/utils/currency";
import dayjs from "dayjs";
import Link from "next/link";
import { Card } from "../ui/card";

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
      <Card className="divide-foreground/10 gap-0 divide-y py-0">
        {transactions.transactions.map((transactionItem) => (
          <Link
            key={transactionItem.id}
            href={`/${type}/${transactionItem.id}/edit?${searchParams}`}
            className="hover:bg-foreground/8 block px-2.5 py-2.5 transition-colors duration-150 ease-out"
            style={{ textDecoration: "none" }}
          >
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
            {transactionItem.description && (
              <p className="text-muted-foreground mt-1 pl-10 text-[0.8125rem] wrap-break-word">
                {transactionItem.description}
              </p>
            )}
          </Link>
        ))}
      </Card>
    </div>
  );
}
