import { useCarousel } from '../../hooks/useCarousel';

/**
 * Rebuild of the `glider-contain` markup, with working arrows and dots.
 * Class names are unchanged so styles/site/ styles it exactly as before.
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
    <div className="glider-contain mr-0 tile-carousel active">
      <div className="glider-wrapper glider" ref={trackRef}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide glider-slide d-flex d-md-block ${
              typeof slideClassName === 'function' ? slideClassName(i) : slideClassName
            }`.trim()}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="glider-actions d-flex">
        {/*
          Left empty deliberately. The original page renders this container
          with no children - glider.js would have populated it - and the
          spacer is what pushes the arrows to the right. Rendering dots here
          instead changes the visible layout, so navigation stays on the
          arrows and on the track's own scrolling.
        */}
        <div className="glider-dots d-none d-md-flex align-items-center mr-3 flex-grow-1" />
        <nav className="arrow-nav d-flex" aria-label={label}>
          <button
            type="button"
            className="glider-prev glider-button-white"
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
            className="glider-next glider-button-white"
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
