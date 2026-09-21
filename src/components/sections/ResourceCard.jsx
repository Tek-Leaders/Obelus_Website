import PlaceholderImage from '../common/PlaceholderImage';

// Simple original glyphs (not sourced from any brand's icon set) mapped by
// the card's eyebrow, so the badge hints at the content type at a glance.
const BADGE_ICONS = {
  'solution brief': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H9l-4 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20V9M12 20V4M19 20v-7" />
      <path d="M3 20h18" />
    </svg>
  ),
  'case study': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h16v11H4z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  'use case': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
};

export default function ResourceCard({ card }) {
  const badgeIcon = BADGE_ICONS[card.eyebrow.toLowerCase()];

  return (
    <a
      className="resource-tile d-flex tile-surface flex-column-reverse tile-branded tile-stacked"
      data-type="obelus"
      href={card.href}
      data-analytics={`${card.track}:${card.cta.toLowerCase()}`}
      target={card.target}
      rel="noopener"
    >
      {badgeIcon && (
        <span className="resource-badge" aria-hidden="true">
          {badgeIcon}
        </span>
      )}
      <div className="image-container">
        <figure className="desktop-image ar-16-9 contain">
          <PlaceholderImage src={card.image} alt="" label={card.eyebrow} />
        </figure>
        <figure className="mobile-image ar-16-9 contain">
          <PlaceholderImage src={card.image} alt="" label={card.eyebrow} />
        </figure>
      </div>
      <div className="text-container">
        <div className="mb-3 text-dark">
          <span className="card-small-title eyebrow text-dark">{card.eyebrow}</span>
        </div>
        <div className="heading-sm card-title mb-3 text-dark">{card.title}</div>
        {/* Presentational: the whole card is the link, so this must not be a
            second tab stop or a nested interactive element. */}
        <span
          className="btn btn-dark mb-2"
          data-analytics={`${card.track}:${card.cta}`}
          aria-hidden="true"
        >
          {card.cta}
          <i />
        </span>
      </div>
    </a>
  );
}
