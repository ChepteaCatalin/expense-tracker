"use client";

import dayjs from "dayjs";
import NavLink from "./NavLink";
import PaymentsIcon from "@mui/icons-material/Payments";

export default function IncomeNavLink() {
  return (
    <NavLink
      href={`/incomes/categories?month=${dayjs().format("YYYY-MM-DD")}`}
      Icon={PaymentsIcon}
      text="Income"
    />
  );
}
