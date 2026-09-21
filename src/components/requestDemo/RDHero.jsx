import { requestDemoHero, customerLogos } from '../../data/requestDemo';
import PlaceholderImage from '../common/PlaceholderImage';
import Reveal from '../common/Reveal';

export default function RDHero() {
  return (
    <div className="rd-hero-copy">
      <Reveal>
        <p className="rd-eyebrow">
          <img src="/assets/img/obelus/obelus-icon.png" alt="" className="rd-eyebrow-icon" />
          {requestDemoHero.eyebrow}
        </p>
        <h1 className="rd-title">{requestDemoHero.title}</h1>
        <p className="rd-body">{requestDemoHero.body}</p>
      </Reveal>

      {customerLogos.length > 0 && (
        <Reveal delay={120} as="ul" className="rd-logo-wall" aria-label="Customers using OBELUS">
          {customerLogos.map((c) => (
            <li key={c.name}>
              <PlaceholderImage src={c.logo} alt={c.name} label={c.name} />
            </li>
          ))}
        </Reveal>
      )}
    </div>
  );
}
