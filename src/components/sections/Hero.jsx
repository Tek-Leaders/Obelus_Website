import { useEffect, useRef, useState } from 'react';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';

/**
 * Whether to stream the product tour automatically.
 *
 * The clip is ~40 MB. Autoplaying it costs a visitor on a metered or slow
 * connection real money and a stalled page, so on those we show the poster
 * frame with a play control instead and let them choose. Anything we cannot
 * measure is treated as fine, which is the common case.
 */
function shouldAutoplay() {
  if (typeof navigator === 'undefined') return true;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return true;
  if (conn.saveData) return false;
  return !['slow-2g', '2g', '3g'].includes(conn.effectiveType);
}

/**
 * The product-tour video under the opening statement. The copy that used to
 * sit above it now lives in CsmIntro.
 */
export default function Hero() {
  const { waypointRef, step1 } = useHeroAnimation();
  const videoRef = useRef(null);
  const mediaFrameRef = useRef(null);
  // Decided during the first render, not in an effect: by the time an effect
  // runs the browser has already acted on the autoPlay attribute and started
  // downloading, which is the thing being avoided.
  const [autoplay] = useState(shouldAutoplay);

  // React applies `muted` as a DOM property rather than an attribute, which
  // can land after the element tries to autoplay - and Chrome blocks autoplay
  // on a video it does not yet consider muted. Setting it imperatively before
  // calling play() makes the hero video start reliably.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    // Left on the poster with controls: nothing beyond metadata is fetched
    // until the visitor presses play.
    if (!autoplay) return;

    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      // A rejection just means the browser declined; the poster frame remains.
      attempt.catch(() => {});
    }
  }, [autoplay]);

  const enlargeVideo = () => {
    // Fullscreening the frame div (not the <video> itself) lets CSS stretch
    // the video to fill the screen with object-fit: cover - fullscreening
    // the video element directly locks it to the browser's native
    // letterboxed "contain" rendering, which leaves blank bars top/bottom.
    const frame = mediaFrameRef.current;
    const video = videoRef.current;
    if (frame && frame.requestFullscreen) {
      frame.requestFullscreen();
    } else if (video && video.webkitEnterFullscreen) {
      // iOS Safari's video-only fullscreen API has no letterbox-free option.
      video.webkitEnterFullscreen();
    }
  };

  return (
    <div className="hero-block">
      <div className="block-space pad-top-0" />
      <div className={`obelus-hero ${step1 ? 'is-intro' : ''}`.trim()} data-type="obelus">
        <div className="container-fluid">
          <div className="hero-stack">
            <div className="hero-media-wrap">
              <div className="hero-media ratio-16x9" ref={mediaFrameRef}>
                <video
                  ref={videoRef}
                  className="hero-video"
                  autoPlay={autoplay}
                  muted
                  playsInline
                  loop
                  // "metadata", not "auto": the clip is ~40 MB and preloading
                  // it in full delays everything else on the page.
                  preload="metadata"
                  poster="/assets/img/obelus/product-tour-poster.webp"
                  controls={!autoplay}
                  aria-label="OBELUS security operations platform demo"
                >
                  <source src="/assets/video/Obelus-Product-Tour.mp4" type="video/mp4" />
                </video>
                <button
                  type="button"
                  className="video-zoom"
                  onClick={enlargeVideo}
                  aria-label="Enlarge video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="obelus-hero-waypoint" ref={waypointRef} />
    </div>
  );
}
