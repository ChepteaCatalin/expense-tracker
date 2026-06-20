'use client';

import InsightError from '../_components/InsightError';

export default function IncomeTreemapError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Income by Category" retry={unstable_retry} />;
}
