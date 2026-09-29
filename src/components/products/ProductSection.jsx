import { useRef } from 'react';
import PlaceholderImage from '../common/PlaceholderImage';
import Reveal from '../common/Reveal';
import ProductIcon from '../layout/ProductIcon';

/**
 * One full-width product block: icon + title, paragraph, CTA on one side and
 * a screenshot on the other, alternating sides down the page. `index` picks
 * the side (even = image right, odd = image left), matching the reference
 * layout's alternating rhythm.
 */
export default function ProductSection({ product, index }) {
  const imageOnRight = index % 2 === 0;
  const videoRef = useRef(null);
  const videoWrapRef = useRef(null);

  const enlargeVideo = () => {
    // Fullscreening the wrapping div (not the <video> itself) lets the CSS
    // below stretch the video to fill the screen with object-fit: cover -
    // fullscreening the video element directly locks it to the browser's
    // native letterboxed "contain" rendering, which leaves blank bars.
    const wrap = videoWrapRef.current;
    const video = videoRef.current;
    if (wrap && wrap.requestFullscreen) {
      wrap.requestFullscreen();
    } else if (video && video.webkitEnterFullscreen) {
      // iOS Safari's video-only fullscreen API has no letterbox-free option.
      video.webkitEnterFullscreen();
    }
  };

  const copy = (
    <Reveal className="prod-copy" delay={80}>
      <span className="prod-icon">
        <ProductIcon id={product.icon} />
      </span>
      <h2 className="prod-title" id={`${product.id}-title`}>
        {product.label}
      </h2>
      <p className="prod-body">{product.description}</p>
      <a className="prod-cta" href="#">
        {product.cta}
        <span aria-hidden="true">→</span>
      </a>
    </Reveal>
  );

  const image = (
    <Reveal className="prod-media" delay={160}>
      {product.video ? (
        <div className="prod-media-video" ref={videoWrapRef}>
          <video
            ref={videoRef}
            src={product.video}
            autoPlay
            muted
            loop
            playsInline
            // "metadata", not "auto": the clip is ~40 MB, and this one sits
            // below the fold, so preloading it in full competes with the
            // content the visitor is actually looking at.
            preload="metadata"
            poster="/assets/img/obelus/product-tour-poster.webp"
            aria-label={`${product.label} product tour`}
          />
          <button
            type="button"
            className="prod-media-zoom-btn"
            onClick={enlargeVideo}
            aria-label={`Enlarge ${product.label} video`}
          />
        </div>
      ) : (
        <a
          href={product.image}
          target="_blank"
          rel="noopener noreferrer"
          className="prod-media-link"
          aria-label={`Open ${product.label} screenshot full size`}
        >
          <PlaceholderImage
            src={product.image}
            alt={`${product.label} overview`}
            label={`${product.label} screenshot`}
          />
          <i className="prod-media-zoom" aria-hidden="true" />
        </a>
      )}
    </Reveal>
  );

  return (
    <section
      className={`prod-section ${imageOnRight ? 'image-right' : 'image-left'}`}
      id={product.id}
      aria-labelledby={`${product.id}-title`}
    >
      <div className="prod-container">
        {imageOnRight ? (
          <>
            {copy}
            {image}
          </>
        ) : (
          <>
            {image}
            {copy}
          </>
        )}
      </div>
    </section>
  );
}
