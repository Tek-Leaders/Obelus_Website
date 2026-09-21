import NetworkBackground from './NetworkBackground';

/**
 * The hero's animated network + Obelus watermark, rendered once at the page
 * shell level (see Layout.jsx) with `position: fixed`. It stays pinned to
 * the viewport while the page scrolls, so every section scrolls up over it
 * rather than each section carrying its own copy of the animation.
 * Sections with their own opaque background naturally cover it once they
 * scroll into view - only the hero (which has no background of its own,
 * see .obelus-hero in styles/site/hero.css) lets it show through directly.
 */
export default function FixedBackground() {
  return (
    <div className="site-fixed-bg" aria-hidden="true">
      <NetworkBackground
        className="site-fixed-bg-network"
        dotColor="rgba(58, 122, 224, 0.95)"
        glowColor="rgba(58, 122, 224, 0.8)"
        lineColor="rgba(58, 122, 224, 0.28)"
        orbColor="rgba(58, 122, 224, 0)"
      />
      <img
        src="/assets/img/obelus/obelus-mark-large.png"
        alt=""
        className="site-fixed-bg-watermark"
      />
    </div>
  );
}
