import Reveal from '../common/Reveal';
import TeamSocials from './TeamSocials';

/**
 * Founder & CEO feature: large portrait on a studio-style backdrop on one side,
 * name, title and bio on the other. The portrait has the same hover reveal
 * of social links as the team cards; the links are also listed under the bio
 * so they are always reachable.
 */
export default function FounderSpotlight({ founder }) {
  const { name, role, photo, bio, socials } = founder;

  return (
    <section className="team-founder" aria-labelledby="team_founder_name">
      <div className="team-container team-founder-grid">
        <Reveal className="team-founder-media">
          <div className="team-founder-frame">
            <img src={photo} alt={`${name}, ${role} of OBELUS`} decoding="async" />
            <div className="team-card-overlay team-founder-overlay">
              <TeamSocials name={name} socials={socials} />
            </div>
          </div>
        </Reveal>

        <Reveal className="team-founder-copy" delay={120}>
          <p className="team-eyebrow">Leadership</p>
          <h2 className="team-founder-name" id="team_founder_name">
            {name}
          </h2>
          <p className="team-founder-role">{role}</p>
          {bio.map((paragraph) => (
            <p className="team-founder-bio" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <TeamSocials name={name} socials={socials} className="team-socials-inline" />
        </Reveal>
      </div>
    </section>
  );
}
