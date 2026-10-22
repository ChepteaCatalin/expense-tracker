import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Loan } from "@/types/loans";
import { readableCurrency } from "@/utils/currency";
import { cn } from "cn";
import { format } from "date-fns";

export default function LoanCard({
  loan: {
    lender,
    currency,
    amount,
    paidAmount,
    remainingAmount,
    startDate,
    isPaidOff,
    paidOffDate,
    notes,
  },
  noHoverEffects = false,
}: {
  loan: Loan;
  noHoverEffects?: boolean;
}) {
  const formatAmount = (amountInCents: number) =>
    `${readableCurrency(amountInCents)} ${currency}`;

  return (
    <Card
      className={cn(
        "via-card to-primary/8 dark:to-primary/15 @container gap-5 rounded-2xl bg-linear-135 from-violet-500/6 via-60% p-6 transition-shadow dark:from-violet-500/10",
        isPaidOff
          ? "ring-primary-light/60 shadow-primary-light/15 dark:ring-primary-light/70 shadow-[0_0_24px]"
          : "shadow-lg shadow-black/10 dark:shadow-black/40",
        !noHoverEffects &&
          (isPaidOff
            ? "hover:shadow-primary-light/25 hover:shadow-[0_0_36px]"
            : "hover:shadow-xl hover:shadow-black/15 dark:hover:shadow-black/60"),
      )}
    >
      <Heading lender={lender} isPaidOff={isPaidOff} />
      <RepaymentProgress
        paid={paidAmount}
        total={amount}
        isPaidOff={isPaidOff}
      />
      <div className="grid grid-cols-1 gap-3 pointer-fine:@lg:grid-cols-3">
        <AmountCard label="Borrowed" value={formatAmount(amount)} />
        <AmountCard
          label="Paid"
          value={formatAmount(paidAmount)}
          highlight={isPaidOff}
        />
        <AmountCard
          label="Remaining"
          value={formatAmount(remainingAmount)}
          highlight={!isPaidOff}
        />
      </div>
      <Separator />
      <div className="flex flex-col gap-1.5">
        <DateRow label="Started" value={startDate} />
        {paidOffDate && <DateRow label="Paid off" value={paidOffDate} accent />}
      </div>
      {notes && (
        <p className="border-primary-light bg-muted/60 text-muted-foreground dark:bg-muted/30 rounded-lg border-l-3 px-4 py-2.5 text-sm wrap-break-word italic">
          {notes}
        </p>
      )}
    </Card>
  );
}

function Heading({
  lender,
  isPaidOff,
}: {
  lender: string;
  isPaidOff: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-muted-foreground text-sm font-medium">Owed to</p>
        <h2 className="text-2xl leading-[1.2] font-bold tracking-[-0.01em] wrap-break-word">
          {lender}
        </h2>
      </div>
      <Badge
        variant="outline"
        className={cn(
          "h-6 px-2.5 font-semibold",
          isPaidOff
            ? "border-primary-light/60 bg-primary/10 text-primary-light dark:bg-primary/25"
            : "border-border bg-muted text-muted-foreground dark:bg-muted/50",
        )}
      >
        {isPaidOff ? "Paid Off" : "Active"}
      </Badge>
    </div>
  );
}

function RepaymentProgress({
  paid,
  total,
  isPaidOff,
}: {
  paid: number;
  total: number;
  isPaidOff: boolean;
}) {
  const percentage = (paid / total) * 100;

  return (
    <Progress
      value={Math.min(percentage, 100)}
      className={cn(
        "gap-x-2 gap-y-1.5 **:data-[slot=progress-indicator]:rounded-full **:data-[slot=progress-indicator]:bg-linear-to-r *:data-[slot=progress-track]:h-2",
        isPaidOff
          ? "**:data-[slot=progress-indicator]:from-primary-light **:data-[slot=progress-indicator]:to-primary"
          : "**:data-[slot=progress-indicator]:from-primary-light **:data-[slot=progress-indicator]:to-violet-500",
      )}
    >
      <ProgressLabel className="text-muted-foreground">Repaid</ProgressLabel>
      <span
        className={cn(
          "ml-auto text-sm font-bold tabular-nums",
          isPaidOff && "text-primary-light",
        )}
      >
        {percentage.toFixed(2)}%
      </span>
    </Progress>
  );
}

function AmountCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-lg border p-3 text-center",
        highlight
          ? "border-primary-light/30 bg-primary/5 dark:bg-primary/10"
          : "bg-muted/40 dark:bg-muted/20",
      )}
    >
      <span className="text-muted-foreground mb-1 block text-xs">{label}</span>
      <p
        className={cn(
          "text-[0.95rem] font-bold wrap-break-word tabular-nums",
          highlight && "text-primary-light",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function DateRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: Date;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p
        className={cn("text-sm font-semibold", accent && "text-primary-light")}
      >
        {format(value, "d MMMM yyyy")}
      </p>
    </div>
  );
}
