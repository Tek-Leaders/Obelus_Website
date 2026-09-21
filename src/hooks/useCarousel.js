import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Carousel state for a native scroll-snap track: a drag/swipe works for
 * free and the arrows just scroll by one slide.
 */
export function useCarousel(slideCount) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  // Slide pitch is measured from the offset between two slides so the 3rem
  // margin-right that site/sections.css puts on .carousel-slide is included in
  // the step.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track && track.children[0];
    if (!first) return { step: 0, visible: 1 };
    const second = track.children[1];
    const step = second
      ? second.offsetLeft - first.offsetLeft
      : first.offsetWidth;
    const visible = step
      ? Math.max(1, Math.round(track.clientWidth / step))
      : 1;
    return { step, visible };
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { step, visible } = measure();
    setPerView(visible);
    if (step) setIndex(Math.round(track.scrollLeft / step));
  }, [measure]);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return undefined;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollToIndex = useCallback(
    (next) => {
      const track = trackRef.current;
      if (!track) return;
      const { step, visible } = measure();
      const max = Math.max(0, slideCount - visible);
      const clamped = Math.min(Math.max(next, 0), max);
      track.scrollTo({ left: clamped * step, behavior: 'smooth' });
      setIndex(clamped);
    },
    [measure, slideCount]
  );

  const maxIndex = Math.max(0, slideCount - perView);

  return {
    trackRef,
    index,
    perView,
    pageCount: maxIndex + 1,
    canPrev: index > 0,
    canNext: index < maxIndex,
    prev: () => scrollToIndex(index - 1),
    next: () => scrollToIndex(index + 1),
    goTo: scrollToIndex,
  };
}
