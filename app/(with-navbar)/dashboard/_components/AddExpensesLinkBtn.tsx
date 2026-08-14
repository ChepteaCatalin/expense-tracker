"use client";

import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function AddExpensesLinkBtn() {
  return (
    <Link href={`/expenses/categories?month=${dayjs().format("YYYY-MM-DD")}`}>
      <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1.5 }}>
        Add Expenses
      </Button>
    </Link>
  );
}
