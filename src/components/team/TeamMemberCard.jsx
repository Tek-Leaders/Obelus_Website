import TeamSocials from './TeamSocials';

// Neutral silhouette shown until a member's photo is supplied.
function AvatarPlaceholder() {
  return (
    <svg className="team-avatar" viewBox="0 0 120 150" aria-hidden="true">
      <circle cx="60" cy="56" r="24" />
      <path d="M18 150c0-26 19-44 42-44s42 18 42 44z" />
    </svg>
  );
}

/**
 * Team member card: portrait, then name and role. Hovering (or focusing a
 * link inside) slides the social links up over the bottom of the portrait;
 * on touch screens they stay visible.
 */
export default function TeamMemberCard({ member }) {
  const { name, role, photo, socials } = member;

  return (
    <article className="team-card">
      <div className="team-card-media">
        {photo ? (
          <img src={photo} alt={`${name}, ${role}`} loading="lazy" decoding="async" />
        ) : (
          <AvatarPlaceholder />
        )}
        <div className="team-card-overlay">
          <TeamSocials name={name} socials={socials} />
        </div>
      </div>
      <div className="team-card-body">
        <h4 className="team-card-name">{name}</h4>
        <p className="team-card-role">{role}</p>
      </div>
    </article>
  );
}
