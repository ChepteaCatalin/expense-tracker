import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NoSavingsGoals() {
  return (
    <Card>
      <CardContent className="space-y-2 text-center">
        <SearchX className="text-muted-foreground mx-auto h-12 w-12" />
        <p className="font-medium">There are no savings goals yet</p>
        <Link
          href="/savings/new"
          className={buttonVariants({ variant: "default" })}
        >
          <Plus data-icon="inline-start" />
          Add Savings Goal
        </Link>
      </CardContent>
    </Card>
  );
}
