"use client";

import InsightError from "../_components/InsightError";

export default function IncomeBreakdownError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Income Breakdown" retry={unstable_retry} />;
}
