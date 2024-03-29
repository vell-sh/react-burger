import { RefObject, useEffect, useMemo, useState } from 'react';

export function useIsInViewport(ref: RefObject<HTMLDivElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)),
    []
  );

  useEffect(() => {
    observer.observe(ref.current!);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
