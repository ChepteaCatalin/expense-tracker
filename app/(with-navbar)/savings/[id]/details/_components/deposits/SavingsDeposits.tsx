import type { SavingsDeposit } from "@/types/savings";
import { readableCurrency } from "@/utils/currency";
import { format } from "date-fns";
import { cn } from "cn";
import {
  ArrowDownLeft,
  Calculator,
  CalendarDays,
  Pencil,
  Plus,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NoSavingsDeposits from "./NoSavingsDeposits";
import AddEditDepositDialog from "./AddEditDepositDialog";
import DeleteDeposit from "./DeleteDeposit";

export default async function SavingsDeposits({
  deposits,
  isGoalCompleted,
  goalId,
  goalCurrency,
}: {
  deposits: SavingsDeposit[];
  isGoalCompleted: boolean;
  goalCurrency: string;
  goalId: number;
}) {
  if (!deposits.length)
    return (
      <NoSavingsDeposits
        goalId={goalId}
        goalCurrency={goalCurrency}
        isGoalCompleted={isGoalCompleted}
      />
    );

  return (
    <Card className="@container gap-5 rounded-2xl shadow-lg shadow-black/10 sm:[--card-spacing:--spacing(5)] dark:shadow-black/40">
      <CardHeader className="items-center border-b">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-bold tracking-[-0.01em]">
            Deposits
          </CardTitle>
          <Badge
            variant="outline"
            className="border-border bg-muted text-muted-foreground dark:bg-muted/50 font-semibold tabular-nums"
          >
            {deposits.length}
          </Badge>
        </div>
        <CardAction className="self-center">
          <AddEditDepositDialog
            goalId={goalId}
            currency={goalCurrency}
            triggerBtn={
              <Button size="sm" disabled={isGoalCompleted}>
                <Plus data-icon="inline-start" />
                Add
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {deposits.length > 1 && (
          <>
            <Stats deposits={deposits} currency={goalCurrency} />
            <Separator />
          </>
        )}
        <ul className="flex flex-col gap-2.5">
          {deposits.map((deposit) => (
            <DepositItem
              key={deposit.id}
              deposit={deposit}
              goalId={goalId}
              currency={goalCurrency}
              isGoalCompleted={isGoalCompleted}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function DepositItem({
  deposit,
  goalId,
  currency,
  isGoalCompleted,
}: {
  deposit: SavingsDeposit;
  goalId: number;
  currency: string;
  isGoalCompleted: boolean;
}) {
  return (
    <li className="bg-muted/40 hover:bg-muted/60 dark:bg-muted/20 dark:hover:bg-muted/35 flex items-start gap-3 rounded-xl border p-3 pr-1.5 transition-colors">
      <div className="bg-primary/10 text-primary-light dark:bg-primary/20 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full">
        <ArrowDownLeft className="size-4" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-primary-light font-bold wrap-break-word tabular-nums">
              +{readableCurrency(deposit.amount)} {currency}
            </p>
            <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
              <CalendarDays className="size-3" />
              {formatDate(deposit.date)}
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <AddEditDepositDialog
              goalId={goalId}
              deposit={deposit}
              currency={currency}
              triggerBtn={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Edit deposit"
                  disabled={isGoalCompleted}
                >
                  <Pencil />
                </Button>
              }
            />
            <DeleteDeposit id={deposit.id} isGoalCompleted={isGoalCompleted} />
          </div>
        </div>
        {deposit.notes && (
          <p className="text-muted-foreground mr-1.5 text-sm wrap-break-word whitespace-pre-wrap">
            {deposit.notes}
          </p>
        )}
      </div>
    </li>
  );
}

function Stats({
  deposits,
  currency,
}: {
  deposits: SavingsDeposit[];
  currency: string;
}) {
  const totalAmount = deposits.reduce(
    (sum, deposit) => sum + deposit.amount,
    0,
  );
  const avgAmount = totalAmount / deposits.length;
  const minDeposit = deposits.reduce((min, deposit) =>
    deposit.amount < min.amount ? deposit : min,
  );
  const maxDeposit = deposits.reduce((max, deposit) =>
    deposit.amount > max.amount ? deposit : max,
  );

  return (
    <div className="grid grid-cols-1 gap-3 @lg:grid-cols-3">
      <StatCard
        label="Average"
        icon={Calculator}
        value={readableCurrency(avgAmount)}
        currency={currency}
        highlight
      />
      <StatCard
        label="Minimum"
        icon={TrendingDown}
        value={readableCurrency(minDeposit.amount)}
        date={minDeposit.date}
        currency={currency}
      />
      <StatCard
        label="Maximum"
        icon={TrendingUp}
        value={readableCurrency(maxDeposit.amount)}
        date={maxDeposit.date}
        currency={currency}
      />
    </div>
  );
}

function StatCard({
  label,
  icon: Icon,
  value,
  date,
  currency,
  highlight,
}: {
  label: string;
  icon: LucideIcon;
  value: string;
  date?: Date;
  currency: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1 rounded-lg border p-3",
        highlight
          ? "border-primary-light/30 bg-primary/5 dark:bg-primary/10"
          : "bg-muted/40 dark:bg-muted/20",
      )}
    >
      <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <Icon className="size-3.5" />
        {label}
      </span>
      <p className="text-primary-light text-[0.95rem] font-bold wrap-break-word tabular-nums">
        {value} {currency}
      </p>
      {date && (
        <span className="text-muted-foreground text-xs">
          {formatDate(date)}
        </span>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  return format(date, "d MMM yyyy");
}
