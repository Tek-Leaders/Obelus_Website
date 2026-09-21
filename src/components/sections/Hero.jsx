import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { hero } from '../../data/hero';

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
      <div className="block-space spacer-none" />
      <div className={`obelus-hero ${step1 ? 'step-1' : ''}`.trim()} data-type="obelus">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-5">
              <div className="heading mt-3 mb-5 my-md-0">
                <span className="eyebrow obelus-hero-icon">{hero.eyebrow}</span>
                <div className="copy-block">
                  <h1 className="h1 title text-white">
                    {hero.titleLines[0]} <br className="d-none d-xl-inline" />
                    {hero.titleLines[1]}
                  </h1>
                  {/* Kept as an h2: site/base.css gives h1-h6 a 0.5rem bottom margin
                      but p a 1rem one, so swapping the tag would shift layout. */}
                  <h2 className="heading-sm text-white mt-4">{hero.subtitle}</h2>
                  <span>
                    <br />
                  </span>
                  <div>
                    <div className="block-space spacer-none" />
                    <ul className="list-unstyled" data-type="">
                      <li>
                        <Link
                          to={hero.primaryCta.href}
                          className="btn mb-3 btn-primary dark"
                          data-analytics="obelus:hero:request a demo"
                        >
                          {hero.primaryCta.label}
                          <i />
                        </Link>
                      </li>
                    </ul>
                    <ul className="list-unstyled">
                      <li>
                        <Link
                          to={hero.secondaryCta.href}
                          className="btn btn-link mb-2 dark"
                          data-analytics="obelus:hero:explore the platform"
                        >
                          {hero.secondaryCta.label}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-10 offset-lg-1 col-xl-7 offset-xl-0">
              <div className="main-image-wrap">
                <div className="main-image ar-16-9" ref={mediaFrameRef}>
                  <video
                    ref={videoRef}
                    className="hero_video"
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
      </div>
      <div className="obelus-hero-waypoint" ref={waypointRef} />
    </div>
  );
}
