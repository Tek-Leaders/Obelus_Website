import { Link } from 'react-router-dom';
import NetworkBackground from '../components/common/NetworkBackground';
import Reveal from '../components/common/Reveal';
import PlatformDiagram from '../components/about/PlatformDiagram';
import {
  aboutHero,
  aboutApproach,
  aboutVision,
  aboutPillars,
  aboutWhy,
  aboutClosing,
} from '../data/about';
import '../styles/about.css';

/**
 * Each section has its own shape - a wide hero, a two-column approach, an
 * editorial vision spread, a numbered list of pillars and a plain two-column
 * list of reasons - so the page reads as a document rather than a stack of
 * identical card grids.
 */
export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <NetworkBackground
          className="about-hero-bg"
          density={0.00006}
          maxLinkDistance={140}
          dotColor="rgba(110, 165, 255, 1)"
          glowColor="rgba(110, 165, 255, 0.95)"
          lineColor="rgba(110, 165, 255, 0.45)"
          orbColor="rgba(110, 165, 255, 0)"
        />
        <div className="about-container">
          {/* Staggered so the eyebrow, headline and lede arrive in reading order. */}
          <div className="about-hero-inner">
            <Reveal>
              <p className="about-eyebrow">{aboutHero.eyebrow}</p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="about-hero-title">{aboutHero.title}</h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="about-lede">{aboutHero.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-section about-approach" aria-labelledby="about_approach">
        <div className="about-container about-split">
          <Reveal className="about-split-copy">
            <p className="about-eyebrow">{aboutApproach.eyebrow}</p>
            <h2 className="about-title" id="about_approach">
              {aboutApproach.title}
            </h2>
            <p className="about-body">{aboutApproach.body}</p>
          </Reveal>
          <Reveal className="about-split-media" delay={120}>
            <PlatformDiagram {...aboutApproach.diagram} />
          </Reveal>
        </div>
      </section>

      {/* Vision: heading on the left, copy on the right, promises beneath. */}
      <section className="about-section about-vision" aria-labelledby="about_vision">
        <div className="about-container">
          <div className="about-spread">
            <Reveal className="about-spread-head">
              <p className="about-eyebrow">{aboutVision.eyebrow}</p>
              <h2 className="about-title" id="about_vision">
                {aboutVision.title}
              </h2>
            </Reveal>
            <Reveal className="about-spread-body" delay={100}>
              {aboutVision.body.map((paragraph) => (
                <p className="about-body" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
          <Reveal as="ul" className="about-promises" delay={160}>
            {aboutVision.highlights.map((label, i) => (
              <li key={label} style={{ "--i": i }}>
                {label}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Pillars: a numbered list, not cards. */}
      <section className="about-section about-pillars" aria-labelledby="about_pillars">
        <div className="about-container">
          <Reveal className="about-section-head">
            <p className="about-eyebrow">{aboutPillars.eyebrow}</p>
            <h2 className="about-title" id="about_pillars">
              {aboutPillars.title}
            </h2>
          </Reveal>
          <ol className="about-list">
            {aboutPillars.items.map((item, i) => (
              <Reveal as="li" className="about-list-row" delay={i * 70} key={item.title}>
                <span className="about-list-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="about-list-head">
                  <h3 className="about-list-title">{item.title}</h3>
                  <p className="about-list-subtitle">{item.subtitle}</p>
                </div>
                <p className="about-list-body">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-section about-why" aria-labelledby="about_why">
        <div className="about-container about-spread">
          <Reveal className="about-spread-head">
            <p className="about-eyebrow">{aboutWhy.eyebrow}</p>
            <h2 className="about-title" id="about_why">
              {aboutWhy.title}
            </h2>
          </Reveal>
          <Reveal as="ul" className="about-reasons" delay={100}>
            {aboutWhy.items.map((item, i) => (
              <li key={item.title} style={{ "--i": i }}>
                <h3 className="about-reason-title">{item.title}</h3>
                <p className="about-body">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="about-section about-closing" aria-labelledby="about_closing">
        <div className="about-container">
          <Reveal className="about-closing-inner">
            <h2 className="about-title about-closing-title" id="about_closing">
              {aboutClosing.title}
            </h2>
            <p className="about-body">{aboutClosing.body}</p>
            <p className="about-tagline">{aboutClosing.tagline}</p>
            <div className="about-actions">
              <Link
                to={aboutClosing.primaryCta.href}
                className="about-btn about-btn-primary"
                data-analytics="obelus:about:request a demo"
              >
                {aboutClosing.primaryCta.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to={aboutClosing.secondaryCta.href}
                className="about-btn about-btn-ghost"
                data-analytics="obelus:about:meet our team"
              >
                {aboutClosing.secondaryCta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
