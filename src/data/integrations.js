// The "Works with the stack you already run" band.
//
// NOTE: this list is a template. Each entry is a claim that OBELUS integrates
// with that product, so trim it to the connectors you actually ship before
// this goes anywhere public.

export const integrationsHeading = {
  eyebrow: 'Integrations',
  titleParts: [{ text: 'Works with the stack ' }, { text: 'you already run', gradient: true }],
  body:
    'The OBELUS integration framework exchanges signals, alerts and context in both directions across your security tooling — strengthening detection, cutting operational overhead, and making every tool in the ecosystem work off the same picture.',
  cta: { label: 'See integrations', href: '/products', internal: true },
};

export const integrationGroups = [
  {
    label: 'Cloud & identity',
    items: ['Microsoft Entra ID', 'AWS CloudTrail', 'Google Workspace', 'Microsoft 365', 'Okta'],
  },
  {
    label: 'Network & edge',
    items: ['Palo Alto NGFW', 'Fortinet FortiGate', 'Cisco Secure Firewall', 'Cloudflare', 'OPNsense'],
  },
  {
    label: 'Endpoint',
    items: ['CrowdStrike Falcon', 'SentinelOne', 'Microsoft Defender', 'Sophos', 'HarfangLab'],
  },
  {
    label: 'Infrastructure',
    items: ['VMware ESXi', 'Apache HTTP Server', 'Veeam', 'Linux auditd', 'Kubernetes'],
  },
];
