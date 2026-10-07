import DeleteGoal from "./DeleteGoal";
import CompleteGoal from "./CompleteGoal";
import Link from "next/link";
import type { SavingsGoal } from "@/types/savings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import ReopenGoal from "./ReopenGoal";

export default function ActionsButtons({ goal }: { goal: SavingsGoal }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <div className="w-full">
          {goal.isCompleted ? (
            <Button variant="secondary" disabled className="w-full">
              <Edit data-icon="inline-start" /> Edit
            </Button>
          ) : (
            <Link
              href={`/savings/${goal.id}/edit`}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <Edit data-icon="inline-start" /> Edit
            </Link>
          )}
        </div>
        {goal.isCompleted ? (
          <ReopenGoal id={goal.id} />
        ) : (
          <CompleteGoal id={goal.id} startDate={goal.startDate} />
        )}
        <DeleteGoal id={goal.id} />
      </CardContent>
    </Card>
  );
}
