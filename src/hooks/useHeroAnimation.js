import { useEffect, useRef, useState } from 'react';

/**
 * Replaces js/13-main-nav.js.
 *
 * The original added a `step-1` class to `.obelus-hero` 500ms after load, and
 * registered a Waypoint on the zero-height `.obelus-hero-waypoint` element with
 * `offset: '50%'`: scrolling down past the middle of the viewport ran
 * cleanUp() and scrolling back up re-ran startAnimation().
 *
 * No waypoint library is used; the crossing test is done
 * directly. IntersectionObserver is deliberately not used here: the waypoint
 * element has no height, and a zero-area target does not report intersection
 * reliably across browsers, which left the hero stuck without `step-1`.
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
