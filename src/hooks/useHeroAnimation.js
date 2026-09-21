import { useEffect, useRef, useState } from 'react';

/**
 * Hero intro animation. Returns `step1`, which Hero.jsx turns into the
 * `is-intro` class 500ms after load. Scrolling the zero-height
 * `.obelus-hero-waypoint` element past the middle of the viewport resets it,
 * and scrolling back up plays it again.
 *
 * The crossing test is done directly on scroll. IntersectionObserver is
 * deliberately not used: the waypoint element has no height, and a zero-area
 * target does not report intersection reliably across browsers.
 */
export function useHeroAnimation() {
  const waypointRef = useRef(null);
  const timeoutRef = useRef(null);
  const belowRef = useRef(true);
  const [step1, setStep1] = useState(false);

  useEffect(() => {
    const start = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStep1(true), 500);
    };
    const cleanUp = () => {
      clearTimeout(timeoutRef.current);
      setStep1(false);
    };

    start();

    // Waypoint's `offset: '50%'` fires as the element crosses the vertical
    // middle of the viewport; only act on an actual change of direction.
    const check = () => {
      const el = waypointRef.current;
      if (!el) return;
      const below = el.getBoundingClientRect().top >= window.innerHeight * 0.5;
      if (below === belowRef.current) return;
      belowRef.current = below;
      if (below) start();
      else cleanUp();
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeoutRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { waypointRef, step1 };
}
