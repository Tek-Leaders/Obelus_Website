import { useEffect, useRef } from 'react';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';

/**
 * The product-tour video under the opening statement. The copy that used to
 * sit above it now lives in CsmIntro.
 */
export default function Hero() {
  const { waypointRef, step1 } = useHeroAnimation();
  const videoRef = useRef(null);
  const mediaFrameRef = useRef(null);

  // React applies `muted` as a DOM property rather than an attribute, which
  // can land after the element tries to autoplay - and Chrome blocks autoplay
  // on a video it does not yet consider muted. Setting it imperatively before
  // calling play() makes the hero video start reliably.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      // A rejection just means the browser declined; the poster frame remains.
      attempt.catch(() => {});
    }
  }, []);

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
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
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
