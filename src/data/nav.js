export const navLeftLinks = [
  {
    label: 'Products',
    href: '/products',
    internal: true,
    target: '_self',
    track: 'obelusNav:Products',
    // Hovering the link opens this panel; each entry jumps to that product's
    // section on /products. Ids match those in data/products.js, which the
    // page uses as its section ids.
    id: 'nav_products',
    dropdown: [
      {
        label: 'SIEM',
        href: '/products#siem',
        text: 'Event management, information management and correlation in one detection hub.',
      },
      {
        label: 'UEBA',
        href: '/products#ueba',
        text: 'Profile user risk and detect the anomalous behavior behind insider threats.',
      },
      {
        label: 'Threat Intelligence Platform',
        href: '/products#tip',
        text: 'Aggregate and structure millions of IOCs for event analysis and adversary profiling.',
      },
      {
        label: 'SOAR',
        href: '/products#soar',
        text: 'Automate incident response with customizable, API-driven playbooks.',
      },
      {
        label: 'Investigations By Graph',
        href: '/products#graph',
        text: 'Correlate IPs, URLs, domains and metadata to trace a threat end to end.',
      },
      {
        label: 'Brand Monitoring',
        href: '/products#brand',
        text: 'Track mentions and sentiment across social and digital channels.',
      },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    internal: true,
    target: '_self',
    track: 'obelusNav:About Us',
  },
  {
    label: 'Our Team',
    href: '/team',
    internal: true,
    target: '_self',
    track: 'obelusNav:Our Team',
  },
  {
    label: 'Contact Us',
    href: '/contact',
    internal: true,
    target: '_self',
    track: 'obelusNav:Contact Us',
  },
];

export const navCta = {
  label: 'Request a Demo',
  href: '/request-demo',
  internal: true,
  track: 'obelusNav:Request a Demo',
};

export const mobileToolbarPrimary = [
  { label: 'Accounts & Support', href: '#', track: 'obelusNav:mobile:Sign In', className: 'account' },
  { label: 'EN', href: '#', track: 'obelusNav:mobile:language' },
];

// TODO: replace /support with the real Obelus support portal URL.
export const mobileToolbarSecondary = [
  {
    label: "What\u2019s New",
    href: '/#resources',
    track: 'obelusNav:Resources',
  },
  {
    label: 'Get support',
    href: '/support',
    target: '_blank',
    track: 'obelusNav:mobile:Get support',
  },
];

// Anchor sub-nav. The CSS uppercases `label`.
export const anchorNavItems = [
  { id: 'challenges', label: 'Challenges', track: 'challenges' },
  { id: 'capabilities', label: 'why obelus', track: 'why obelus' },
  { id: 'tour', label: 'Product Tour', track: 'product tour' },
  { id: 'resources', label: 'RESOURCES', track: 'resources' },
  { id: 'engage', label: 'engage', track: 'engage' },
];
