// Content for the Products page (/products). Image paths point into
// /public/assets/img/products/, which holds no real files yet -
// PlaceholderImage falls back to a labelled box until you drop files in at
// those exact names.

export const productsIntro = {
  eyebrow: 'Products',
  title: 'One platform, built to cover every stage of the SOC',
  body:
    'From detection to response, OBELUS brings SIEM, UEBA, threat intelligence, SOAR, and graph-based investigation together into a single, AI-driven security platform.',
};

export const products = [
  {
    id: 'ai-guard',
    label: 'AI Guard',
    icon: 'aiguard',
    href: '/products/ai-guard',
    image: '/assets/img/products/ai-guard-dashboard.webp',
    description:
      'OBELUS AI Guard is the unified AI security and governance layer for the enterprise: real-time visibility, inline control, and audit-ready proof across people, apps, autonomous agents, models, and MCP tools.',
    cta: 'Explore AI Guard',
  },
  {
    id: 'siem',
    label: 'SIEM',
    icon: 'siem',
    image: '/assets/img/products/siem-diagram.png',
    video: '/assets/video/Obelus-Product-Tour.mp4',
    description:
      'OBELUS SIEM provides a comprehensive security management solution by integrating Security Event Management (SEM), Security Information Management (SIM), and Security Event Correlation (SEC) functionalities. It acts as a central hub, unifying and enhancing existing security controls for effective threat detection and response.',
    cta: 'Explore SIEM',
  },
  {
    id: 'ueba',
    label: 'UEBA',
    icon: 'ueba',
    image: '/assets/img/products/ueba-dashboard.webp',
    description:
      "OBELUS\u2019s User and Entity Behavior Analytics (UEBA) provides enhanced visibility into user activity within your network. By profiling user risk and detecting anomalous behavior, UEBA empowers your team to proactively identify and mitigate insider threats.",
    cta: 'Explore UEBA',
  },
  {
    id: 'tip',
    label: 'Threat Intelligence Platform',
    icon: 'tip',
    image: '/assets/img/products/tip-dashboard.webp',
    description:
      'OBELUS TIP (Threat Intelligence Platform) aggregates, structures, and allows companies to better utilize threat intelligence, with the ability to handle millions of IOCs, conduct cyber event analysis, and adversary profiling.',
    cta: 'Explore the Threat Intelligence Platform',
  },
  {
    id: 'soar',
    label: 'SOAR',
    icon: 'soar',
    image: '/assets/img/products/soar-automation.webp',
    description:
      'OBELUS SOAR platforms streamline security operations by automating routine tasks through customizable playbooks. These playbooks, driven by if-then logic and API integration, enable efficient response to security incidents. Additionally, OBELUS SOAR platforms foster collaboration among analysts, enhancing overall security posture.',
    cta: 'Unlock SOC automation',
  },
  {
    id: 'graph',
    label: 'Investigations By Graph',
    icon: 'graph',
    image: '/assets/img/products/graph-investigation.webp',
    description:
      'Cyber Threat Intelligence (CTI) within OBELUS provides actionable insights by analyzing and correlating various data points, including IPs, URLs, domains, and other contextual metadata. Integrated with our SIEM, UEBA, and SOAR components, CTI empowers organizations to proactively identify and mitigate emerging threats.',
    cta: 'Explore graph investigations',
  },
];
