import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Index-based carousel that advances on a timer, pauses on hover/focus, and
 * lets the visitor jump to any slide. Used by the testimonial section, where
 * each "slide" is a full quote rather than something worth scroll-snapping.
 */
export function useAutoplayCarousel(count, { intervalMs = 6000 } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (next) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return undefined;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    timerRef.current = setTimeout(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, count, intervalMs]);

  return {
    index,
    goTo,
    next,
    prev,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
