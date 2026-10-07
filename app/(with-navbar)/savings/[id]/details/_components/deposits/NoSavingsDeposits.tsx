import { Card, CardContent } from "@/components/ui/card";
import { SearchX, Plus } from "lucide-react";
import AddEditDepositDialog from "./AddEditDepositDialog";
import { Button } from "@/components/ui/button";

export default function NoSavingsDeposits({
  goalId,
  goalCurrency,
  isGoalCompleted,
}: {
  goalId: number;
  goalCurrency?: string;
  isGoalCompleted?: boolean;
}) {
  return (
    <Card>
      <CardContent className="space-y-2 text-center">
        <SearchX className="text-muted-foreground mx-auto h-12 w-12" />
        <p className="font-medium">There are no deposits yet</p>
        <AddEditDepositDialog
          goalId={goalId}
          currency={goalCurrency}
          triggerBtn={
            <Button disabled={isGoalCompleted}>
              <Plus data-icon="inline-start" /> Add Deposit
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
