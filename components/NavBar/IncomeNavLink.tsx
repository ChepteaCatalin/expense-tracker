"use client";

import dayjs from "dayjs";
import NavLink from "./NavLink";
import { HandCoins } from "lucide-react";

export default function IncomeNavLink() {
  return (
    <NavLink
      href={`/incomes/categories?month=${dayjs().format("YYYY-MM-DD")}`}
      Icon={HandCoins}
      text="Income"
    />
  );
}
