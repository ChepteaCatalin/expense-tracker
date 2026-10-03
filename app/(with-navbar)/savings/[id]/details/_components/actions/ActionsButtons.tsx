import DeleteGoalBtn from "./DeleteGoalBtn";
import Link from "next/link";
import type { SavingsGoal } from "@/types/savings";
import CompleteGoalBtn from "./CompleteGoalBtn";
import ReopenGoalBtn from "./ReopenGoalBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function ActionsButtons({ goal }: { goal: SavingsGoal }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <div className="w-full">
          {goal.isCompleted ? (
            <Button variant="outline" disabled className="w-full">
              <Edit data-icon="inline-start" /> Edit
            </Button>
          ) : (
            <Link
              href={`/savings/${goal.id}/edit`}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              <Edit data-icon="inline-start" /> Edit
            </Link>
          )}
        </div>
        {goal.isCompleted ? (
          <ReopenGoalBtn id={goal.id} />
        ) : (
          <CompleteGoalBtn id={goal.id} startDate={goal.startDate} />
        )}
        <DeleteGoalBtn id={goal.id} name={goal.name} />
      </CardContent>
    </Card>
  );
}
