import { useEffect, useRef } from 'react';

export default function useResetFormAfterSubmit(
  reset: () => void,
  isPending: boolean,
) {
  const prevIsPending = useRef(isPending);

  useEffect(() => {
    if (prevIsPending.current && !isPending) reset();
    prevIsPending.current = isPending;
  }, [isPending, reset]);
}
