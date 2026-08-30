"use client";

import dayjs from "dayjs";
import NavLink from "./NavLink";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function ExpensesNavLink() {
  return (
    <NavLink
      href={`/expenses/categories?month=${dayjs().format("YYYY-MM-DD")}`}
      Icon={MonetizationOnIcon}
      text="Expenses"
    />
  );
}
