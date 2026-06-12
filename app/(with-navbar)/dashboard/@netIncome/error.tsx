'use client';

import InsightError from '../_components/InsightError';

export default function NetIncomeError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return <InsightError title="Net Income" retry={unstable_retry} />;
}
