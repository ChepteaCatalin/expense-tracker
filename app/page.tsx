import Home from '@/components/Home';
import { Suspense } from 'react';

export default function MainPage() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
