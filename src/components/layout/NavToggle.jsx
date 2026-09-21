/**
 * A nav control that must remain an <a> element.
 *
 * styles/site/header.css styles the nav through rules scoped to
 * `.nav-primary > li > a` and `.nav-actions > li.search > a` - the search icon
 * is a background-image on that anchor - so swapping in a <button> would strip
 * the styling and blank the icon. The anchor keeps those selectors and gains
 * full button semantics: an explicit role, a tab stop, and Enter/Space
 * activation.
 */
export default function NavToggle({
  children,
  className,
  onActivate,
  expanded,
  hasPopup,
  ...rest
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <a
      className={className}
      role="button"
      tabIndex={0}
      aria-haspopup={hasPopup ? 'true' : undefined}
      aria-expanded={expanded}
      onClick={(e) => {
        e.preventDefault();
        onActivate();
      }}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </a>
  );
}
