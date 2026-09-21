import { useEffect, useState } from 'react';

/**
 * Mirrors a CSS breakpoint in JS. Used where a component must change its
 * markup (not just its styling) across breakpoints - for example the footer
 * accordion, which is only an accordion below the `md` breakpoint.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
