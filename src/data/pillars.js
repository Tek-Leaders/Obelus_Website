// The "Unite your defense" feature blocks on the landing page.
// `layout` alternates leftImage / rightImage down the page.
// `titleParts` splits each heading so the accent span lands on one word.
//
// Images point into /public/assets/img/platform/, which holds no real files
// yet — PillarFeature renders a labelled placeholder box until you drop files
// in at these exact names, then they appear with no code change.

export const pillarsHeading = {
  titleParts: [{ text: 'Unite your ' }, { text: 'defense', gradient: true }],
  body:
    'From detection through investigation to response, OBELUS connects your analysts, your intelligence and your workflows — so the team acts faster, with more clarity and more confidence.',
};

export const pillars = [
  {
    layout: 'leftImage',
    bottomSpacer: 'bottom-spacer-medium',
    icon: '/assets/img/ui/icons/detect.svg',
    image: '/assets/img/obelus/image.png',
    imageAlt: 'OBELUS detection dashboard',
    imageLabel: 'Detection dashboard',
    track: 'obelus:pillartextfeature:detect:image',
    eyebrow: 'Detect',
    titleParts: [{ text: 'Detect what ' }, { text: 'matters', gradient: true }],
    body:
      'Adaptive detection models and unified threat intelligence surface real attacks across endpoint, identity, network and cloud — instead of handing your analysts another queue of low-confidence alerts.',
    bullets: ['Adaptive detection models', 'Unified intelligence', 'Agentic workflows'],
  },
  {
    layout: 'rightImage',
    bottomSpacer: 'bottom-spacer-medium',
    icon: '/assets/img/ui/icons/hunt.svg',
    image: '/assets/img/obelus/investge.png',
    imageAlt: 'OBELUS threat hunting workspace',
    imageLabel: 'Threat hunting workspace',
    track: 'obelus:pillartextfeature:hunt:image',
    eyebrow: 'Hunt',
    titleParts: [{ text: 'Hunt with ' }, { text: 'intent', gradient: true }],
    body:
      'Intelligence-led hunts, guided step by step, let analysts pursue adversary behaviour rather than isolated indicators — and keep tracking a campaign as its infrastructure and tooling change.',
    bullets: ['Intelligence-led hunting', 'Fully guided hunts', 'Continuous adversary tracking'],
  },
  {
    layout: 'leftImage',
    bottomSpacer: 'bottom-spacer-medium',
    icon: '/assets/img/ui/icons/investigate.svg',
    image: '/assets/img/obelus/case.png',
    imageAlt: 'OBELUS graph investigation view',
    imageLabel: 'Graph investigation view',
    track: 'obelus:pillartextfeature:investigate:image',
    eyebrow: 'Investigate',
    titleParts: [{ text: 'Investigate in ' }, { text: 'minutes', gradient: true }],
    body:
      'Evidence is gathered automatically and laid out as a graph, so an analyst can ask questions of the data directly and see exactly how every conclusion was reached.',
    bullets: ['Automated evidence gathering', 'Ask-anything analysis', 'Fully transparent reasoning'],
  },
  {
    layout: 'rightImage',
    bottomSpacer: 'bottom-spacer-large',
    icon: '/assets/img/ui/icons/respond.svg',
    image: '/assets/img/obelus/settings.png',
    imageAlt: 'OBELUS automated response playbook',
    imageLabel: 'Response playbook',
    track: 'obelus:pillartextfeature:respond:image',
    eyebrow: 'Respond',
    titleParts: [{ text: 'Respond ' }, { text: 'automatically', gradient: true }],
    body:
      'Playbooks orchestrate containment right across your stack — isolating hosts, disabling compromised accounts and blocking attacker infrastructure — under one-click approval or full autonomy.',
    bullets: ['Playbooks that evolve', 'Enterprise-wide orchestration', 'Autonomous containment'],
  },
];
