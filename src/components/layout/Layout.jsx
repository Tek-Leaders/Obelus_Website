import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Routes that render without the shared site footer.
const NO_FOOTER_PATHS = ['/', '/request-demo', '/products', '/team', '/about', '/contact'];

/**
 * Shared page shell. The outer div carries the `site` / `site-shell`
 * classes that most rules in styles/site/ are scoped under, so it must stay
 * on every page.
 */
export default function Layout() {
  const { pathname, hash } = useLocation();
  const showFooter = !NO_FOOTER_PATHS.includes(pathname);

  // The browser only scrolls to a #fragment on a full page load, so a router
  // link like /products#siem lands at the top of the page instead. The target
  // may not exist until the new route has painted, hence the rAF.
  useEffect(() => {
    if (!hash) return undefined;
    const frame = requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div className="site site-shell">
      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
