import { Link } from 'react-router-dom';
import { aiGuardHero } from '../../data/aiGuard';
import '../../styles/ai-guard-intro-hero.css';

/**
 * "Introducing OBELUS AI Guard" statement, first thing on the page, above
 * CsmIntro. Deliberately has no background of its own - Layout renders
 * FixedBackground once at the page-shell level (position: fixed, see
 * components/common/FixedBackground.jsx) and every section without an
 * opaque background of its own shows it through directly, which is what
 * makes this read as floating over the same backdrop as the rest of the
 * page rather than a boxed-off banner.
 */
export default function AiGuardIntroHero() {
  return (
    <section className="aigih-section" aria-labelledby="aigih_title">
      <div className="aigih-glow" aria-hidden="true" />
      <div className="aigih-inner">
        <p className="aigih-eyebrow">Introducing</p>
        <p className="aigih-descriptor">AI Security and Compliance Engine</p>
        <h2 className="aigih-title" id="aigih_title">
          OBELUS <span className="aigih-title-accent">AI Guard</span>
        </h2>
        <Link
          to="/products/ai-guard"
          className="aigih-link"
          data-analytics="obelus:home:ai guard intro:learn more"
        >
          Learn more
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <ul className="aigih-pillars">
          {aiGuardHero.pillars.map((pillar, i) => (
            <li key={pillar.label}>
              {i + 1}. {pillar.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
