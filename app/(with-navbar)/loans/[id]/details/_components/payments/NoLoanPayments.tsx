import { Card, CardContent } from "@/components/ui/card";
import { SearchX, Plus } from "lucide-react";
import AddEditPaymentDialog from "./AddEditPaymentDialog";
import { Button } from "@/components/ui/button";
import type { Loan } from "@/types/loans";
import { calendarDay } from "@/utils/date";

export default function NoLoanPayments({ loan }: { loan: Loan }) {
  return (
    <Card>
      <CardContent className="space-y-2 text-center">
        <SearchX className="text-muted-foreground mx-auto h-12 w-12" />
        <p className="font-medium">There are no payments yet</p>
        <AddEditPaymentDialog
          loanId={loan.id}
          currency={loan.currency}
          maxAmount={loan.remainingAmount}
          startDay={calendarDay(loan.startDate)}
          triggerBtn={
            <Button disabled={loan.isPaidOff}>
              <Plus data-icon="inline-start" /> Add Payment
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
