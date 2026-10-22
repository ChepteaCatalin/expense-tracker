import type { Loan, LoanPayment } from "@/types/loans";
import { readableCurrency } from "@/utils/currency";
import { calendarDay } from "@/utils/date";
import { format } from "date-fns";
import { cn } from "cn";
import {
  ArrowUpRight,
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
import NoLoanPayments from "./NoLoanPayments";
import AddEditPaymentDialog from "./AddEditPaymentDialog";
import DeletePayment from "./DeletePayment";

export default function LoanPayments({
  loan,
  payments,
}: {
  loan: Loan;
  payments: LoanPayment[];
}) {
  if (!payments.length) return <NoLoanPayments loan={loan} />;

  const startDay = calendarDay(loan.startDate);

  return (
    <Card className="@container gap-5 rounded-2xl shadow-lg shadow-black/10 sm:[--card-spacing:--spacing(5)] dark:shadow-black/40">
      <CardHeader className="items-center border-b">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-bold tracking-[-0.01em]">
            Payments
          </CardTitle>
          <Badge
            variant="outline"
            className="border-border bg-muted text-muted-foreground dark:bg-muted/50 font-semibold tabular-nums"
          >
            {payments.length}
          </Badge>
        </div>
        <CardAction className="self-center">
          <AddEditPaymentDialog
            loanId={loan.id}
            currency={loan.currency}
            maxAmount={loan.remainingAmount}
            startDay={startDay}
            triggerBtn={
              <Button size="sm" disabled={loan.isPaidOff}>
                <Plus data-icon="inline-start" />
                Add
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {payments.length > 1 && (
          <>
            <Stats payments={payments} currency={loan.currency} />
            <Separator />
          </>
        )}
        <ul className="flex flex-col gap-2.5">
          {payments.map((payment) => (
            <PaymentItem
              key={payment.id}
              payment={payment}
              loan={loan}
              startDay={startDay}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PaymentItem({
  payment,
  loan,
  startDay,
}: {
  payment: LoanPayment;
  loan: Loan;
  startDay: string;
}) {
  return (
    <li className="bg-muted/40 hover:bg-muted/60 dark:bg-muted/20 dark:hover:bg-muted/35 flex items-start gap-3 rounded-xl border p-3 pr-1.5 transition-colors">
      <div className="bg-primary/10 text-primary-light dark:bg-primary/20 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full">
        <ArrowUpRight className="size-4" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-primary-light font-bold wrap-break-word tabular-nums">
              {readableCurrency(payment.amount)} {loan.currency}
            </p>
            <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
              <CalendarDays className="size-3" />
              {formatDate(payment.date)}
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <AddEditPaymentDialog
              loanId={loan.id}
              payment={payment}
              currency={loan.currency}
              maxAmount={loan.remainingAmount + payment.amount}
              startDay={startDay}
              triggerBtn={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Edit payment"
                >
                  <Pencil />
                </Button>
              }
            />
            <DeletePayment id={payment.id} />
          </div>
        </div>
        {payment.notes && (
          <p className="text-muted-foreground mr-1.5 text-sm wrap-break-word whitespace-pre-wrap">
            {payment.notes}
          </p>
        )}
      </div>
    </li>
  );
}

function Stats({
  payments,
  currency,
}: {
  payments: LoanPayment[];
  currency: string;
}) {
  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const avgAmount = totalAmount / payments.length;
  const minPayment = payments.reduce((min, payment) =>
    payment.amount < min.amount ? payment : min,
  );
  const maxPayment = payments.reduce((max, payment) =>
    payment.amount > max.amount ? payment : max,
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
        value={readableCurrency(minPayment.amount)}
        date={minPayment.date}
        currency={currency}
      />
      <StatCard
        label="Maximum"
        icon={TrendingUp}
        value={readableCurrency(maxPayment.amount)}
        date={maxPayment.date}
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
