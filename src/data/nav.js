export const navLeftLinks = [
  {
    label: 'Products',
    href: '/products',
    internal: true,
    target: '_self',
    track: 'obelusNav:Products',
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
  { label: 'EN', href: '#', track: 'nav:mobile:language' },
];

// TODO: replace /support with the real Obelus support portal URL.
export const mobileToolbarSecondary = [
  {
    label: 'Contact Us',
    href: '/request-demo',
    track: 'obelusNav:Contact Us',
  },
  {
    label: "What's New",
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

// Anchor sub-nav. `label` preserves the original casing; the CSS uppercases it.
export const anchorNavItems = [
  { id: 'challenges', label: 'Challenges', track: 'challenges' },
  { id: 'capabilities', label: 'why obelus', track: 'why obelus' },
  { id: 'tour', label: 'Product Tour', track: 'product tour' },
  { id: 'resources', label: 'RESOURCES', track: 'resources' },
  { id: 'engage', label: 'engage', track: 'engage' },
];
