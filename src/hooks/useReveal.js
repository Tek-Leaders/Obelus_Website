import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal: returns a ref to attach and a boolean that flips true once
 * the element has entered the viewport. Used to fade/slide sections in as the
 * visitor scrolls down the page. Fires once per element and respects
 * prefers-reduced-motion by simply starting revealed.
 */
export function useReveal(options = {}) {
  const { threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = options;
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, revealed];
}
