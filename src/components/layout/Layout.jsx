import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Routes that render without the shared site footer.
const NO_FOOTER_PATHS = ['/', '/request-demo', '/products'];

/**
 * Shared page shell. The outer div carries the `site` / `site-shell`
 * classes that most rules in styles/site/ are scoped under, so it must stay
 * on every page.
 */
export default function Layout() {
  const { pathname } = useLocation();
  const showFooter = !NO_FOOTER_PATHS.includes(pathname);

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
