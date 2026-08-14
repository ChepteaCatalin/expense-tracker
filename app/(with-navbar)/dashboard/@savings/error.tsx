"use client";

import InsightError from "../_components/InsightError";

export default function SavingsError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Savings" retry={unstable_retry} />;
}
