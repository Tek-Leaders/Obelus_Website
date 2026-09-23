// Social links for a team member. Only networks with a non-empty link are
// rendered; `email` may be a bare address or a mailto: link.

const ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 9.5v8" />
      <circle cx="6.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <path d="M11 17.5v-8" />
      <path d="M11 13c0-2.2 1.4-3.5 3.2-3.5S17.5 10.8 17.5 13v4.5" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
};

const LABELS = { linkedin: 'LinkedIn', email: 'Email' };

const hrefFor = (network, value) =>
  network === 'email' && value !== '#' && !value.startsWith('mailto:') ? `mailto:${value}` : value;

export default function TeamSocials({ name, socials = {}, className = '' }) {
  const entries = Object.keys(ICONS).filter((network) => socials[network]);
  if (!entries.length) return null;

  return (
    <ul className={`team-socials ${className}`.trim()}>
      {entries.map((network) => {
        const href = hrefFor(network, socials[network]);
        const external = network !== 'email';
        return (
          <li key={network}>
            <a
              href={href}
              aria-label={`${name} on ${LABELS[network]}`}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              data-analytics={`obelus:team:${network}`}
            >
              {ICONS[network]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
