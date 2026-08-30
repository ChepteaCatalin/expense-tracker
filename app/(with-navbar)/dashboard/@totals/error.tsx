"use client";

import InsightError from "../_components/InsightError";

export default function TotalsError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Totals" retry={unstable_retry} />;
}
