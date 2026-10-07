"use client";

import { format } from "date-fns";
import NavLink from "./NavLink";
import { HandCoins } from "lucide-react";

export default function IncomeNavLink() {
  return (
    <NavLink
      href={`/incomes/categories?month=${format(new Date(), "yyyy-MM-dd")}`}
      Icon={HandCoins}
      text="Income"
    />
  );
}
