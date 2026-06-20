'use client';

import InsightError from '../_components/InsightError';

export default function ExpensesTreemapError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Expenses by Category" retry={unstable_retry} />;
}
