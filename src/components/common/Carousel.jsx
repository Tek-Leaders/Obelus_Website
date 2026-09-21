import { useCarousel } from '../../hooks/useCarousel';

/**
 * Horizontal card carousel: a native scroll-snap track with prev/next
 * arrows. Styled by styles/site/buttons.css and sections.css.
 */
export default function Carousel({
  children,
  label,
  trackPrefix = '',
  // Either a string applied to every slide, or (index) => string.
  slideClassName = '',
}) {
  const slides = Array.isArray(children) ? children : [children];
  const { trackRef, canPrev, canNext, prev, next } = useCarousel(slides.length);

  return (
    <div className="carousel mr-0 tile-carousel active">
      <div className="carousel-track carousel-scroll" ref={trackRef}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`carousel-slide d-flex d-md-block ${
              typeof slideClassName === 'function' ? slideClassName(i) : slideClassName
            }`.trim()}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="carousel-controls d-flex">
        {/*
          Left empty deliberately: this flexible spacer is what pushes the
          arrows to the right. Navigation is the arrows plus the track's own
          scrolling.
        */}
        <div className="carousel-dots d-none d-md-flex align-items-center mr-3 flex-grow-1" />
        <nav className="carousel-arrows d-flex" aria-label={label}>
          <button
            type="button"
            className="carousel-prev carousel-btn-outline"
            aria-label={`${label} previous`}
            aria-disabled={!canPrev}
            disabled={!canPrev}
            data-analytics={`${trackPrefix}previous`}
            onClick={prev}
          >
            Previous
          </button>
          <button
            type="button"
            className="carousel-next carousel-btn-outline"
            aria-label={`${label} next`}
            aria-disabled={!canNext}
            disabled={!canNext}
            data-analytics={`${trackPrefix}next`}
            onClick={next}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
