"use client";

import { format } from "date-fns";
import NavLink from "./NavLink";
import { CircleDollarSign } from "lucide-react";

export default function ExpensesNavLink() {
  return (
    <NavLink
      href={`/expenses/categories?month=${format(new Date(), "yyyy-MM-dd")}`}
      Icon={CircleDollarSign}
      text="Expenses"
    />
  );
}
