"use client";

import InsightError from "../_components/InsightError";

export default function ExpensesBreakdownError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Expenses Breakdown" retry={unstable_retry} />;
}
