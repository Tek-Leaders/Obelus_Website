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
 * Team member card: portrait, then name and role.
 *
 * The `socials` links are deliberately not shown here - only the founder's
 * are, listed under the bio in FounderSpotlight. The data is still carried on
 * each member in data/team.js if the card links are ever wanted back.
 */
export default function TeamMemberCard({ member }) {
  const { name, role, photo } = member;

  return (
    <article className="team-card">
      <div className="team-card-media">
        {photo ? (
          <img src={photo} alt={`${name}, ${role}`} loading="lazy" decoding="async" />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      <div className="team-card-body">
        <h4 className="team-card-name">{name}</h4>
        <p className="team-card-role">{role}</p>
      </div>
    </article>
  );
}
