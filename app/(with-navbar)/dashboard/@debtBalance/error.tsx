"use client";

import InsightError from "../_components/InsightError";

export default function DebtBalanceError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Remaining Debt" retry={unstable_retry} />;
}
