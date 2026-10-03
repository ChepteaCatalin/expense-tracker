import AddDepositOutlinedBtn from "../actions/AddDepositOutlinedBtn";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX } from "lucide-react";

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
        <AddDepositOutlinedBtn
          id={goalId}
          currency={goalCurrency}
          disabled={isGoalCompleted}
        />
      </CardContent>
    </Card>
  );
}
