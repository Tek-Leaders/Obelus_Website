import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchSite } from '../../data/searchIndex';
import '../../styles/search-overlay.css';

/**
 * Site search panel. There is no search backend or CMS, so this matches
 * against a small static index of the site's own pages/sections
 * (data/searchIndex.js) instead - enough to actually take a visitor
 * somewhere, unlike the empty placeholder this used to render.
 */
export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchSite(query);

  // Held in a ref so the effect below depends only on `open`. onClose is a new
  // function on every parent render, and listing it as a dependency would tear
  // down and re-add the key listener (and re-fire focus) on each of them.
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(-1);
      return undefined;
    }
    inputRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const target = results[activeIndex] || results[0];
    if (target) goTo(target.path);
  };

  const onKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
  };

  if (!open) return null;

  return (
    <div className="search-ov" role="dialog" aria-modal="true" aria-label="Site search">
      <button
        type="button"
        className="search-ov-backdrop"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="search-ov-panel">
        <form className="search-ov-form" role="search" onSubmit={onSubmit}>
          <svg className="search-ov-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <label className="sr-only" htmlFor="obelus_search_query">
            Search the Obelus site
          </label>
          <input
            ref={inputRef}
            id="obelus_search_query"
            className="search-ov-input"
            type="search"
            placeholder="Search products, pages…"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={onKeyDown}
          />
          <button type="button" className="search-ov-close" aria-label="Close search" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        {query.trim() && (
          <ul className="search-ov-results" role="listbox">
            {results.length ? (
              results.map((entry, i) => (
                <li key={entry.path}>
                  <button
                    type="button"
                    className={`search-ov-result ${i === activeIndex ? 'active' : ''}`.trim()}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => goTo(entry.path)}
                  >
                    <span className="search-ov-result-title">{entry.title}</span>
                    <span className="search-ov-result-desc">{entry.description}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="search-ov-empty">No matches for &ldquo;{query}&rdquo;.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
