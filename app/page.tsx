import { Suspense } from 'react';
import TestHiddenContent from './TestHiddenContent';

export default async function RootPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TestHiddenContent />
    </Suspense>
  );
}
