"use client";

import NavigateBackBtn from "@/components/NavigateBackBtn";
import { format } from "date-fns";

export default function FormNavigateBackBtn() {
  return (
    <NavigateBackBtn
      fallbackHref={`/incomes/categories?month=${format(new Date(), "yyyy-MM-dd")}`}
    />
  );
}
