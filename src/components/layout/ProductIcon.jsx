/**
 * Small line-art icons for the Products accordion, one per product id.
 * Plain inline SVG (stroke only, no fill) so they inherit `currentColor` and
 * stay crisp at any size - no image asset needed for these.
 */
const ICONS = {
  siem: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M7 21h10M12 17v4" />
      <path d="M6.5 13l2.5-4 2 2.5 2.5-4.5 2.5 4" />
    </>
  ),
  ueba: (
    <>
      <path d="M9 3a4 4 0 0 1 4 4c0 1.6-.9 2.6-1.8 3.4-.7.6-1.2 1.2-1.2 2.1" />
      <path d="M10 15.5h2" />
      <circle cx="18" cy="18" r="3" />
      <path d="M18 16.5v3M16.5 18h3" />
      <path d="M3 20a5 5 0 0 1 8-4" />
    </>
  ),
  tip: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <circle cx="12" cy="11" r="1.4" />
      <path d="M12 9v-1M12 13v1M10.6 9.6l-.7-.7M14.1 13.1l.7.7M14.1 9.6l.7-.7M9.9 13.1l-.7.7" />
    </>
  ),
  soar: (
    <>
      <path d="M6 20V10M12 20V4M18 20v-7" />
      <path d="M3 10l3-3 3 3M9 4l3-3 3 3M13 13l3-3 3 3" />
    </>
  ),
  graph: (
    <>
      <circle cx="12" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.5 7.5L6.5 16M13.5 7.5l4 8.5M7 18h10" />
    </>
  ),
  brand: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
      <circle cx="12" cy="9" r="2" />
      <path d="M8 13c.7-1.6 2.1-2.5 4-2.5s3.3.9 4 2.5" />
    </>
  ),
};

export default function ProductIcon({ id, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[id] || ICONS.siem}
    </svg>
  );
}
