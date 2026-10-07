"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddExpensesLinkBtn() {
  return (
    <Link
      href={`/expenses/categories?month=${dayjs().format("YYYY-MM-DD")}`}
      className={cn(buttonVariants({ variant: "default" }), "mt-3")}
    >
      <Plus /> Add Expenses
    </Link>
  );
}
