import DeleteLoan from "./DeleteLoan";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function ActionsButtons({ loanId }: { loanId: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <div className="w-full">
          <Link
            href={`/loans/${loanId}/edit`}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            <Edit data-icon="inline-start" /> Edit
          </Link>
        </div>
        <DeleteLoan id={loanId} />
      </CardContent>
    </Card>
  );
}
