import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Site search panel. There is no search backend yet, so site/header.css
 * hides the panel's contents with
 *   .site.site-shell .search-interface { display: none }
 * and the search button opens an empty panel. The open/close behaviour is
 * real React state; only the contents are hidden.
 *
 * To make the search box visible, drop the `search-interface` class from
 * the wrapper below; the markup underneath is a working, labelled search form
 * that submits to SEARCH_ACTION.
 */
// TODO: point these at the real Obelus search page and documentation site.
const SEARCH_ACTION = '/search';

const TECH_DOCS_URL = '/docs';

export default function SearchOverlay({ open, onClose }) {
  const [scopeOpen, setScopeOpen] = useState(false);
  const inputRef = useRef(null);

  // Held in a ref so the effect below depends only on `open`. onClose is a new
  // function on every parent render, and listing it as a dependency would tear
  // down and re-add the key listener (and re-fire focus) on each of them.
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) {
      setScopeOpen(false);
      return undefined;
    }
    // No-ops while the panel is hidden by the
    // `.search-interface { display: none }` rule; see the note above.
    inputRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className={`obelus-nav-search ${open ? '' : 'd-none'}`.trim()}>
      <div>
        <div>
          <div className="site-search">
            <div
              id="site_search"
              className="search-interface obelus-search"
            >
              <div className="obelus-search-header">
                <div className="container">
                  <div className="search-logo" />
                  <span className="search-label">Search</span>
                  <div className="obelus-search-container">
                    <div className={`dropdown ${scopeOpen ? 'open' : ''}`.trim()}>
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="search_scope_toggle"
                        aria-haspopup="true"
                        aria-expanded={scopeOpen}
                        onClick={() => setScopeOpen((v) => !v)}
                      >
                        All
                        <span className="caret">
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M1 1L5.5 5.5L10 1"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="search_scope_toggle"
                        hidden={!scopeOpen}
                      >
                        <li>
                          <a href={TECH_DOCS_URL} id="search_docs_link" rel="nofollow">
                            Tech Docs
                          </a>
                        </li>
                      </ul>
                    </div>

                    <form
                      className="search-box"
                      role="search"
                      id="obelus-search-input"
                      action={SEARCH_ACTION}
                      method="get"
                    >
                      <label className="sr-only" htmlFor="obelus_search_query">
                        Search the Obelus site
                      </label>
                      <input
                        ref={inputRef}
                        id="obelus_search_query"
                        type="search"
                        name="q"
                        placeholder="Search"
                        autoComplete="off"
                      />
                    </form>
                  </div>

                  <button
                    type="button"
                    className="btn btn-link btn-close-obelus-search"
                    aria-label="Close Search modal"
                    onClick={onClose}
                  >
                    <svg
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <line
                        x1="1.5"
                        y1="-1.5"
                        x2="18.3323"
                        y2="-1.5"
                        transform="matrix(0.70711 -0.707104 0.70711 0.707104 1.97656 17.0236)"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <line
                        x1="1.5"
                        y1="-1.5"
                        x2="18.3323"
                        y2="-1.5"
                        transform="matrix(-0.707106 -0.707107 -0.707106 0.707107 14.0234 17.0236)"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
