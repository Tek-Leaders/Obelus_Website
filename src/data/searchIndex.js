// Entries the header search box matches against. No backend/CMS exists, so
// this is a small static index of the site's own pages and product sections
// rather than a real search service - enough to actually take a visitor
// somewhere, which is all the site has content for today.

export const searchIndex = [
  {
    title: 'Home',
    description: 'OBELUS: AI-driven security operations platform.',
    path: '/',
    keywords: 'home landing csm combined security management',
  },
  {
    title: 'OBELUS AI Guard',
    description: 'Secure enterprise AI at the point of use: visibility, inline control and audit-ready proof.',
    path: '/products/ai-guard',
    keywords: 'ai guard security compliance governance mcp agents prompt injection',
  },
  {
    title: 'SIEM',
    description: 'Event management, information management and correlation in one detection hub.',
    path: '/products#siem',
    keywords: 'siem security information event management detection',
  },
  {
    title: 'UEBA',
    description: 'Profile user risk and detect the anomalous behavior behind insider threats.',
    path: '/products#ueba',
    keywords: 'ueba user entity behavior analytics insider threat',
  },
  {
    title: 'Threat Intelligence Platform',
    description: 'Aggregate and structure millions of IOCs for event analysis and adversary profiling.',
    path: '/products#tip',
    keywords: 'tip threat intelligence platform ioc adversary',
  },
  {
    title: 'SOAR',
    description: 'Automate incident response with customizable, API-driven playbooks.',
    path: '/products#soar',
    keywords: 'soar automation orchestration response playbooks',
  },
  {
    title: 'Investigations By Graph',
    description: 'Correlate IPs, URLs, domains and metadata to trace a threat end to end.',
    path: '/products#graph',
    keywords: 'graph investigation correlation ip url domain',
  },
  {
    title: 'Products',
    description: 'One platform, built to cover every stage of the SOC.',
    path: '/products',
    keywords: 'products platform soc',
  },
  {
    title: 'About Us',
    description: 'Why OBELUS was built and how we approach security operations.',
    path: '/about',
    keywords: 'about company mission vision pillars',
  },
  {
    title: 'Our Team',
    description: 'Meet the people behind OBELUS.',
    path: '/team',
    keywords: 'team people founder leadership',
  },
  {
    title: 'Contact Us',
    description: 'Talk to the OBELUS team or reach any of our offices directly.',
    path: '/contact',
    keywords: 'contact offices address phone email support',
  },
  {
    title: 'Request a Demo',
    description: 'See how OBELUS runs your SOC from detection to response.',
    path: '/request-demo',
    keywords: 'demo request trial walkthrough',
  },
];

/** Case-insensitive match against title, description and keywords. */
export function searchSite(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex.filter((entry) =>
    `${entry.title} ${entry.description} ${entry.keywords}`.toLowerCase().includes(q)
  );
}
