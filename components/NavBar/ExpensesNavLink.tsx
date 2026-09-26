"use client";

import dayjs from "dayjs";
import NavLink from "./NavLink";
import { CircleDollarSign } from "lucide-react";

export default function ExpensesNavLink() {
  return (
    <NavLink
      href={`/expenses/categories?month=${dayjs().format("YYYY-MM-DD")}`}
      Icon={CircleDollarSign}
      text="Expenses"
    />
  );
}
