import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Routes that render without the shared mega-footer.
const NO_FOOTER_PATHS = ['/', '/request-demo', '/products'];

/**
 * Shared page shell. The two outer divs carry the `obelusClean` /
 * `obelus-template-dynamicAllComponents` classes that nearly every rule in
 * styles/site/ is scoped under, so they must stay on every page.
 */
export default function Layout() {
  const { pathname } = useLocation();
  const showFooter = !NO_FOOTER_PATHS.includes(pathname);

  return (
    <div className="obelusClean obelus-template-dynamicAllComponents">
      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="mainDynamicParsys parsys">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
