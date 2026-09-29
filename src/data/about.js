// Content for the About Us page (/about). Edit the copy here; the page layout
// lives in src/pages/About.jsx and src/styles/about.css.

export const aboutHero = {
  eyebrow: 'About Us',
  title: 'Redefining Enterprise Cyber Resilience',
  body:
    'In today’s hyper-connected digital landscape, security teams are overwhelmed by disconnected alerts, tool sprawl, and rapidly evolving threat vectors. Traditional security tools create operational silos, leaving critical blind spots that sophisticated adversaries can exploit.',
};

export const aboutApproach = {
  eyebrow: 'Our Approach',
  title: 'Changing the paradigm',
  body:
    'At Obelus, we are changing the paradigm. We bridge the gap between complexity and control through our pioneering Combined Security Management (CSM) platform—unifying SIEM (Security Information and Event Management), SOAR (Security Orchestration, Automation, and Response), and advanced UEBA (User and Entity Behavior Analytics) into a single, cohesive ecosystem.',
  // Nodes of the platform diagram
  diagram: {
    hub: { label: 'CSM', caption: 'Combined Security Management' },
    nodes: [
      { label: 'SIEM', caption: 'Detect' },
      { label: 'SOAR', caption: 'Respond' },
      { label: 'UEBA', caption: 'Analyze' },
    ],
  },
};

export const aboutVision = {
  eyebrow: 'Our Vision',
  title: 'Unified, Intelligent Defense',
  body: [
    'We believe that enterprise security should not require juggling dozens of disparate point solutions. Our mission is to provide organizations with complete visibility, automated intelligence, and real-time threat neutralization from a single pane of glass.',
    'By consolidating log management, behavioral tracking, and automated workflows, Obelus empowers security operations centers (SOCs) to move from reactive defense to proactive, predictive resilience.',
  ],
  // The three promises from the mission statement, listed under the copy.
  highlights: ['Complete visibility', 'Automated intelligence', 'Real-time threat neutralization'],
};

export const aboutPillars = {
  eyebrow: 'The Platform',
  title: 'Core Pillars of the Obelus Platform',
  items: [
    {
      title: 'Next-Gen SIEM',
      subtitle: 'Security Information & Event Management',
      body: 'Continuously aggregates, normalizes, and correlates logs across your entire IT infrastructure—cloud, on-premises, and hybrid environments—to catch sophisticated threats early.',
    },
    {
      title: 'Advanced SOAR',
      subtitle: 'Security Orchestration & Automated Response',
      body: 'Eliminates manual bottlenecks by automating incident triage, threat containment, and playbook execution, drastically slashing mean-time-to-respond (MTTR).',
    },
    {
      title: 'UEBA',
      subtitle: 'User and Entity Behavior Analytics',
      body: 'Leverages advanced machine learning to establish baseline profiles for every user and device, instantly flagging anomalous activities, insider threats, and compromised credentials before damage occurs.',
    },
    {
      title: 'Unified CSM Architecture',
      subtitle: 'Combined Security Management',
      body: 'Brings posture management, deep analytics, and automation into a single framework to eliminate tool fatigue and reduce operational overhead.',
    },
  ],
};

export const aboutWhy = {
  eyebrow: 'Why Obelus',
  title: 'Why Choose Obelus?',
  items: [
    {
      title: 'Context-Driven Intelligence',
      body: 'We transform raw telemetry into meaningful, risk-aligned insights so your security analysts can focus on high-priority investigations.',
    },
    {
      title: 'Behavior-First Detection',
      body: 'By understanding normal user and entity patterns, we catch stealthy threats that signature-based tools routinely miss.',
    },
    {
      title: 'Built for Speed and Scale',
      body: 'Engineered to handle massive event volumes with lightning-fast query speeds and high fidelity.',
    },
    {
      title: 'Compliance & Audit Readiness',
      body: 'Streamlines compliance tracking and log retention requirements for global security standards.',
    },
  ],
};

export const aboutClosing = {
  title: 'Securing Tomorrow, Today',
  body:
    'Headquartered globally with a relentless commitment to innovation, Obelus is built by security professionals for security professionals. We provide the clarity, behavioral visibility, and automation necessary to safeguard your critical assets against tomorrow’s threats.',
  tagline: 'Protect your enterprise with confidence. Welcome to the future of Combined Security Management.',
  primaryCta: { label: 'Request a Demo', href: '/request-demo' },
  secondaryCta: { label: 'Meet our team', href: '/team' },
};
