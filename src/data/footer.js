// Footer content. `sub: true` renders the <li class="sub-title nav-subheader">
// variant. In the first column, the first group's opening sub-title spans
// both of the first two lists (see the #footer_col_0 rules in
// styles/site/footer.css), so the second list starts below it.
//
// TODO: the /about, /careers, /blog, /news, /security, /trust, /privacy,
// /terms and /legal routes do not exist yet - add those pages (or point these
// links at wherever that content lives) before launch.

export const footerColumns = [
  {
    heading: 'Products and Services',
    groups: [
      [
        {
          label: 'OBELUS Security Operations Platform',
          href: '/products',
          target: '_self',
          sub: true,
          track: 'obelus:footer:platform',
        },
        {
          label: 'Detection and Analytics',
          href: '/products',
          target: '_self',
          sub: true,
          track: 'obelus:footer:detection and analytics',
        },
        { label: 'SIEM', href: '/products#siem', target: '_self', sub: false, track: 'obelus:footer:siem' },
        { label: 'UEBA', href: '/products#ueba', target: '_self', sub: false, track: 'obelus:footer:ueba' },
        {
          label: 'Investigations By Graph',
          href: '/products#graph',
          target: '_self',
          sub: false,
          track: 'obelus:footer:graph investigations',
        },
      ],
      [
        {
          label: 'Intelligence and Response',
          href: '/products',
          target: '_self',
          sub: true,
          track: 'obelus:footer:intelligence and response',
        },
        {
          label: 'Threat Intelligence Platform',
          href: '/products#tip',
          target: '_self',
          sub: false,
          track: 'obelus:footer:threat intelligence platform',
        },
        { label: 'SOAR', href: '/products#soar', target: '_self', sub: false, track: 'obelus:footer:soar' },
        {
          label: 'Brand Monitoring',
          href: '/products#brand',
          target: '_self',
          sub: false,
          track: 'obelus:footer:brand monitoring',
        },
      ],
      [
        {
          label: 'Platform Capabilities',
          href: '/#capabilities',
          target: '_self',
          sub: true,
          track: 'obelus:footer:capabilities',
        },
        { label: 'Detect', href: '/#capabilities', target: '_self', sub: false, track: 'obelus:footer:detect' },
        { label: 'Hunt', href: '/#capabilities', target: '_self', sub: false, track: 'obelus:footer:hunt' },
        {
          label: 'Investigate',
          href: '/#capabilities',
          target: '_self',
          sub: false,
          track: 'obelus:footer:investigate',
        },
        { label: 'Respond', href: '/#capabilities', target: '_self', sub: false, track: 'obelus:footer:respond' },
        {
          label: 'Integrations',
          href: '/#integrations',
          target: '_self',
          sub: false,
          track: 'obelus:footer:integrations',
        },
      ],
      [
        {
          label: 'Get Started',
          href: '/request-demo',
          target: '_self',
          sub: true,
          track: 'obelus:footer:get started',
        },
        {
          label: 'Request a Demo',
          href: '/request-demo',
          target: '_self',
          sub: false,
          track: 'obelus:footer:request a demo',
        },
        {
          label: 'Talk to an Expert',
          href: '/#engage',
          target: '_self',
          sub: false,
          track: 'obelus:footer:talk to an expert',
        },
        {
          label: 'Featured Resources',
          href: '/#resources',
          target: '_self',
          sub: false,
          track: 'obelus:footer:featured resources',
        },
      ],
    ],
  },
  {
    heading: 'Company',
    groups: [
      [
        { label: 'About Us', href: '/about', target: '_self', sub: false, track: 'obelus:footer:about us' },
        { label: 'Careers', href: '/careers', target: '_self', sub: false, track: 'obelus:footer:careers' },
        { label: 'Contact Us', href: '/contact', target: '_self', sub: false, track: 'obelus:footer:contact us' },
        { label: 'Newsroom', href: '/news', target: '_self', sub: false, track: 'obelus:footer:newsroom' },
      ],
    ],
  },
  {
    heading: 'Popular Links',
    groups: [
      [
        { label: 'Blog', href: '/blog', target: '_self', sub: false, track: 'obelus:footer:blog' },
        { label: 'Resources', href: '/#resources', target: '_self', sub: false, track: 'obelus:footer:resources' },
        { label: 'Products', href: '/products', target: '_self', sub: false, track: 'obelus:footer:products' },
        {
          label: 'Report a Vulnerability',
          href: '/security',
          target: '_self',
          sub: false,
          track: 'obelus:footer:report a vulnerability',
        },
      ],
    ],
  },
];

export const footerBottomLinks = [
  { href: '/privacy', track: 'obelus:footer:bottomlinks-0:privacy', label: 'Privacy' },
  { href: '/trust', track: 'obelus:footer:bottomlinks-1:trust center', label: 'Trust Center' },
  { href: '/terms', track: 'obelus:footer:bottomlinks-2:terms of use', label: 'Terms of Use' },
  { href: '/legal', track: 'obelus:footer:bottomlinks-3:legal', label: 'Legal' },
];

// TODO: replace each '#' with the Obelus company profile URL (or drop the
// entry if there is no account on that network).
export const footerSocials = [
  {
    href: '#',
    track: 'obelus:footer:socials-0:youtube',
    src: '/assets/img/ui/social/youtube-black.svg',
    alt: 'YouTube',
  },
  {
    href: '#',
    track: 'obelus:footer:socials-1:facebook',
    src: '/assets/img/ui/social/facebook-black.svg',
    alt: 'Facebook',
  },
  {
    href: '#',
    track: 'obelus:footer:socials-2:linkedin',
    src: '/assets/img/ui/social/linkedin-black.svg',
    alt: 'LinkedIn',
  },
  {
    href: '#',
    track: 'obelus:footer:socials-3:x',
    src: '/assets/img/ui/social/x-black.svg',
    alt: 'X',
  },
];

// The site is English-only for now; add an entry per localized site later.
export const footerLanguages = [{ localTitle: 'ENGLISH', localLink: '/' }];

export const footerCopyright = `Copyright © ${new Date().getFullYear()} Obelus. All Rights Reserved`;
