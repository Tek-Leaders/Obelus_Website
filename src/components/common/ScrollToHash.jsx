import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * With a client-side router the browser no longer resolves `#challenges` style
 * links on its own, because the target may not have been mounted when the URL
 * changed. This scrolls to the anchor once the route has rendered.
 */
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash, pathname]);

  return null;
}
