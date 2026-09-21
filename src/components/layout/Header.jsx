import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  navLeftLinks,
  navCta,
  mobileToolbarPrimary,
  mobileToolbarSecondary,
} from '../../data/nav';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import SearchOverlay from './SearchOverlay';
import NavToggle from './NavToggle';

/**
 * The product nav. The mega-dropdown panels are empty <div>s for now.
 * Every current `navLeftLinks` entry is a plain link (Products included -
 * see /products, a full page rather than a dropdown), so this branch is
 * dormant scaffolding until a future nav item actually needs a dropdown;
 * render into the matching `item.type` below if that happens rather than
 * leaving the panel empty.
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  useLockBodyScroll(mobileOpen || searchOpen);

  // Header persists across route changes (it lives in Layout, above the
  // <Outlet>), so a Link clicked inside an open dropdown or the mobile menu
  // would otherwise navigate while leaving the panel visually stuck open
  // over the new page.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // Close an open mega-dropdown on Escape or on a click outside the nav.
  useEffect(() => {
    if (!openMenu) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openMenu]);

  const toggleMenu = (id) => setOpenMenu((current) => (current === id ? null : id));

  // Hover open/close for mouse pointers, matching how a desktop mega-nav is
  // normally driven. Closing is delayed slightly so moving the pointer from
  // the trigger down into the panel doesn't clip it shut on the way past;
  // moving back over either one within that window cancels the close.
  const openOnHover = (id) => {
    clearTimeout(closeTimerRef.current);
    setOpenMenu(id);
  };
  const closeOnHoverLeave = () => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  const openSearch = () => {
    setMobileOpen(false);
    setOpenMenu(null);
    setSearchOpen(true);
  };

  return (
    <div>
      <div
        className="site-header dark absolute default"
        data-type="obelus"
        id="OBELUS_NAV"
      >
        <div
          className={`site-nav ${openMenu ? 'has-open-dropdown' : ''}`.trim()}
          ref={navRef}
        >
          <button
            type="button"
            className="btn nav-open"
            aria-label="open mobile navigation"
            aria-expanded={mobileOpen}
            aria-controls="site_nav_panel"
            onClick={() => setMobileOpen(true)}
          />
          <Link
            className="mobile-header-logo"
            to="/"
            aria-label="Obelus"
            data-analytics="obelusNav:mobile:home"
          >
            <img
              src="/assets/img/obelus/obelus.png"
              alt="Obelus - Realtime Security"
              className="brand-logo-collapsed"
            />
          </Link>
          <button
            type="button"
            className="btn mobile-search"
            aria-label="search"
            data-analytics="init-nav:mobile:search"
            onClick={openSearch}
          />

          <nav
            id="site_nav_panel"
            className={`site-nav-panel ${mobileOpen ? 'open' : ''}`.trim()}
            aria-label="product main"
          >
            <div className="mobile-header">
              <button
                type="button"
                className="btn nav-close"
                data-analytics="obelusNav:mobile:close nav"
                aria-label="close mobile navigation"
                onClick={() => setMobileOpen(false)}
              >
                <img
                  width="24"
                  height="24"
                  src="/assets/img/ui/close-black.svg"
                  alt=""
                />
              </button>
              <Link
                to="/"
                className="nav-logo"
                data-analytics="obelusNav:mobile:logo"
                aria-label="Obelus"
              >
                <img
                  width="175"
                  height="46"
                  src="/assets/img/obelus/obelus.png"
                  alt="Obelus - Realtime Security"
                  className="brand-logo-mobile"
                />
              </Link>
              <button
                type="button"
                className="btn mobile-search"
                data-analytics="obelusNav:mobile:search"
                aria-label="search"
                onClick={openSearch}
              >
                <img
                  width="28"
                  height="28"
                  src="/assets/img/ui/search-black.svg"
                  alt=""
                />
              </button>
            </div>

            <div className="container-fluid">
              <ul className="nav-left" role="menubar" aria-label="left">
                <li className="link logo" role="none">
                  {/*
                    The logo is a real <img>; styles/brand.css sizes it for
                    every breakpoint and clears the slot's background, so that
                    file is the one place to update if the logo changes.
                  */}
                  <Link
                    to="/"
                    role="menuitem"
                    className="brand-logo-link"
                    data-analytics="obelusNav:logo"
                    aria-label="Obelus"
                  >
                    <img
                      src="/assets/img/obelus/obelus.png"
                      alt="Obelus - Realtime Security"
                      className="brand-logo-desktop"
                    />
                  </Link>
                </li>
                {navLeftLinks.map((item) =>
                  item.href ? (
                    <li className="link" role="none" key={item.label}>
                      {item.internal ? (
                        <Link
                          to={item.href}
                          role="menuitem"
                          data-analytics={item.track}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          role="menuitem"
                          target={item.target}
                          data-analytics={item.track}
                          rel="noopener"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ) : (
                    <li
                      className={openMenu === item.id ? 'open' : undefined}
                      role="none"
                      key={item.label}
                      onMouseEnter={() => openOnHover(item.id)}
                      onMouseLeave={closeOnHoverLeave}
                    >
                      <NavToggle
                        role="menuitem"
                        id={item.id}
                        hasPopup
                        expanded={openMenu === item.id}
                        aria-label={item.label}
                        data-analytics={`obelusNav:${item.label}`}
                        onActivate={() => toggleMenu(item.id)}
                      >
                        {item.label}
                      </NavToggle>
                      <div
                        className="mega-dropdown-menu"
                        aria-labelledby={item.id}
                        data-type={item.type}
                        hidden={openMenu !== item.id}
                      />
                    </li>
                  )
                )}
              </ul>

              <ul
                className="nav-right align-items-center d-flex list-unstyled mb-0"
                role="list"
                aria-label="toolbar dynamic interactions"
              >
                <li className="search me-3" role="listitem">
                  <NavToggle
                    className="d-block"
                    data-analytics="nav:Search"
                    aria-label="search"
                    expanded={searchOpen}
                    onActivate={openSearch}
                  />
                </li>
                <li className="cta cta-primary-wrapper" role="listitem">
                  {navCta.internal ? (
                    <Link
                      to={navCta.href}
                      className="btn btn-primary py-2 px-4"
                      data-analytics={navCta.track}
                    >
                      {navCta.label}
                    </Link>
                  ) : (
                    <a
                      href={navCta.href}
                      target="_self"
                      className="btn btn-primary py-2 px-4"
                      data-analytics={navCta.track}
                      rel="noopener"
                    >
                      {navCta.label}
                    </a>
                  )}
                </li>
              </ul>

              <div className={`nav-mobile-toolbar ${mobileOpen ? '' : 'd-none'}`.trim()}>
                <ul className="mobile-toolbar nav-left" role="list" aria-label="mobile left">
                  {mobileToolbarPrimary.map((item) => (
                    <li role="listitem" className={item.className} key={item.label}>
                      <a href={item.href} data-analytics={item.track}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="mobile-toolbar nav-left" role="list">
                  {mobileToolbarSecondary.map((item) => (
                    <li role="listitem" className="link" key={item.label}>
                      <a
                        href={item.href}
                        target={item.target}
                        data-analytics={item.track}
                        rel="noopener"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          <div
            className={`dropdown-overlay ${openMenu || mobileOpen ? 'active' : ''}`.trim()}
            onClick={() => {
              setOpenMenu(null);
              setMobileOpen(false);
            }}
          />

          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
      </div>
    </div>
  );
}
