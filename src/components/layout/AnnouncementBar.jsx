import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Slim sitewide strip above the header, pointing at AI Guard. Sits in normal
 * document flow (unlike .site-header, whose .site-nav is pinned with
 * `position: absolute; top: 0` - see the `.site-header.absolute` rule added
 * in styles/site/header.css that gives it a positioning context, so this bar
 * pushes the nav down by its own height instead of the two overlapping).
 */
export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="announcement-bar" role="banner">
      <div className="announcement-bar-inner">
        <Link
          to="/products/ai-guard"
          className="announcement-bar-link"
          data-analytics="obelus:announcement:ai guard"
        >
          <span className="announcement-bar-badge">New</span>
          <span className="announcement-bar-text">
            Introducing AI Guard &mdash; secure enterprise AI at the point of use
          </span>
          <span className="announcement-bar-cta" aria-hidden="true">
            Learn more &rarr;
          </span>
        </Link>
        <button
          type="button"
          className="announcement-bar-dismiss"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
