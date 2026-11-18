// Content for the AI Guard product page (/products/ai-guard), ported from
// the standalone OBELUS_AI_Guard.html mockup. Keep this in sync with that
// file if the design brief changes.

export const aiGuardNav = {
  links: [
    { label: 'The Challenge', href: '#challenge' },
    { label: 'Governance Gap', href: '#capabilities' },
    { label: 'Check · Act · Prove', href: '#solution' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Threat Matrix', href: '#matrix' },
  ],
};

export const aiGuardHero = {
  eyebrow: 'Introducing AI Security & Compliance Engine',
  titleLine1: 'OBELUS AI Guard',
  titleLine2: 'Secure Enterprise AI at the Point of Use',
  body: 'The unified AI security and governance layer for the enterprise. Get real-time visibility, inline control, and audit-ready proof across people, apps, autonomous agents, models, and MCP tools.',
  primaryCta: { label: 'Request a Demo', href: '/request-demo' },
  secondaryCta: { label: 'Explore Threat-to-Evidence Matrix', href: '#matrix' },
  pillars: [
    { num: '01', tone: 'check', label: 'Check (Discover & Inspect)' },
    { num: '02', tone: 'act', label: 'Act (Enforce & Contain)' },
    { num: '03', tone: 'prove', label: 'Prove (Audit & Comply)' },
  ],
};

export const aiGuardChallenge = {
  kicker: 'The Challenge',
  title: 'Enterprise AI Is Outpacing Traditional Security',
  body: 'Organizations are rapidly adopting generative AI and autonomous agents across employees and workflows—creating critical blind spots that legacy perimeter and DLP tools cannot govern.',
  items: [
    {
      num: '01',
      title: 'Shadow AI & Uncontrolled Usage',
      body: 'Employees adopt unapproved AI apps and personal accounts across browsers, IDEs, and devices without IT visibility.',
    },
    {
      num: '02',
      title: 'Sensitive Data & Secret Leaks',
      body: 'Confidential information—including PII, Aadhaar, PAN, UPI, proprietary source code, and API keys—is pasted into public AI models.',
    },
    {
      num: '03',
      title: 'Prompt Injections & Model Attacks',
      body: 'Attackers leverage jailbreaks, hidden invisible text, and poisoned documents to trick AI models into bypassing guardrails.',
    },
    {
      num: '04',
      title: 'Runaway & Hijacked AI Agents',
      body: 'Autonomous agents and MCP tools can drift from intent, delete records, move funds, or exfiltrate data unchecked.',
    },
    {
      num: '05',
      title: 'Compliance & Audit Gaps',
      body: 'Security teams lack explainable, tamper-proof evidence to satisfy India’s DPDP Act, RBI, SEBI, EU AI Act, and ISO 42001.',
    },
    {
      num: '06',
      title: 'Unchecked AI Spending',
      body: 'Token usage and cloud API costs spike unexpectedly due to heavy prompts, stolen keys, or runaway automations.',
    },
  ],
};

export const aiGuardCapabilities = {
  kicker: 'Closing the AI Governance Gap',
  title: 'Four Capabilities Beyond Point Controls',
  body: 'Point controls only catch isolated fragments of risk. OBELUS AI Guard delivers four foundational capabilities built for end-to-end enterprise governance.',
  items: [
    {
      title: '01. Continuous Audit Readiness',
      body: 'Audit-ready evidence is generated continuously in real time, allowing security and compliance teams to export reports on demand rather than scrambling at audit time.',
    },
    {
      title: '02. End-to-End Compliance Mapping',
      body: 'Trace every regulatory framework requirement—from DPDP Act, RBI, and SEBI to the EU AI Act and ISO 42001—directly down to the specific AI asset it governs.',
    },
    {
      title: '03. Centralized Guardrail Store',
      body: 'Maintain one governed library of security and policy rules, applied consistently across every AI app, local model, cloud endpoint, and MCP tool.',
    },
    {
      title: '04. Threat Intelligence for AI',
      body: 'Feed real-time detection with continuously updated intelligence on AI-specific threats including emerging injection techniques, jailbreaks, and risky models.',
    },
  ],
};

export const aiGuardSolution = {
  kicker: 'The Solution',
  title: 'Check It. Act On It. Prove It.',
  body: 'OBELUS AI Guard sits directly between people, apps, and agents on one side, and AI models and MCP tools on the other.',
  columns: [
    {
      tone: 'check',
      tag: '01 · CHECK',
      title: 'Discover & Inspect',
      items: [
        'Finds every shadow AI app, local model, MCP server, and cloud AI platform in use.',
        'Maps potential blast radius on a live knowledge graph.',
        'Scans every prompt, response, and tool call with real-time detectors, session awareness, and an explainable business ontology.',
      ],
    },
    {
      tone: 'act',
      tag: '02 · ACT',
      title: 'Enforce & Contain',
      items: [
        'Masks sensitive data (PII, Aadhaar, PAN, UPI, secrets) inline before prompts leave your environment.',
        'Isolates risky browser sessions and coaches users at the point of use.',
        'Enforces token budgets and holds high-risk autonomous agent actions for human approval with an instant kill switch.',
      ],
    },
    {
      tone: 'prove',
      tag: '03 · PROVE',
      title: 'Audit & Comply',
      items: [
        'Records every prompt, policy verdict, and tool execution in a cryptographic flight recorder backed by signed rules.',
        'Exports tamper-proof regulatory evidence packs that auditors can replay step by step.',
      ],
    },
  ],
  principle: {
    label: 'Core Design Principle:',
    body: 'Enforce at the point of use—where prompts are typed, pages are opened, and tool calls are made.',
  },
};

export const aiGuardArchitecture = {
  kicker: 'Unified Platform Architecture',
  title: 'One Control Point Across Every AI Path',
  body: 'Traffic from users, apps, and agents is inspected and governed in real time—producing security containment, AI threat intelligence, and audit-ready outputs.',
  sources: {
    label: 'Enterprise Sources',
    items: [
      { title: 'Employees', sub: 'Browsers, IDEs, endpoints & local devices' },
      { title: 'Applications', sub: 'Internal enterprise apps & external SaaS tools' },
      { title: 'AI Agents', sub: 'Autonomous workflows & MCP tool chains' },
    ],
  },
  hub: {
    title: 'OBELUS AI GUARD CONTROL PLANE',
    sub: 'Inline Runtime Inspection, Policy Enforcement & Cryptographic Recording',
    modules: [
      { title: 'Prompt & Browser Protection', body: 'PII/secret masking · block & coach pages · remote browser isolation' },
      { title: 'Agent & MCP Gateway', body: 'Identity chains · intent checks · mandates · approvals · kill switch' },
      { title: 'Proactive Defense', body: 'AI red teaming · pre-use model scanning · deception decoys' },
      { title: 'Compliance Guardrails', body: 'Framework-mapped guardrails · signed rules · audit evidence' },
    ],
    foundation: 'Live Knowledge Graph  ·  Real-Time Detectors  ·  Flight Recorder',
  },
  outputs: {
    label: 'Governed Outputs',
    items: [
      { title: 'AI Security', sub: 'Blocked, masked & contained threat events' },
      { title: 'Threat Intel for AI', sub: 'AI-specific injection & model risk indicators' },
      { title: 'Audit-Ready Reports', sub: 'Exportable compliance evidence packs' },
    ],
  },
  ecosystem: {
    heading: 'Works Seamlessly With Your AI & Obelus SOC Stack',
    groups: [
      {
        title: 'Foundation Models',
        tags: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Azure OpenAI', 'AWS Bedrock', 'Local / Ollama'],
      },
      {
        title: 'Agent & IDE Surfaces',
        tags: ['MCP Servers', 'LangChain', 'CrewAI', 'VS Code / Cursor', 'Enterprise Browsers'],
      },
      {
        title: 'Compliance Frameworks',
        tags: ['DPDP Act (India)', 'RBI & SEBI', 'ISO/IEC 42001', 'EU AI Act', 'NIST AI RMF'],
      },
      {
        title: 'Obelus CSM Integration',
        tags: ['Obelus SIEM', 'Obelus UEBA', 'Obelus SOAR', 'Threat Intel Hub', 'Graph Investigations'],
      },
    ],
  },
};

export const aiGuardMatrix = {
  kicker: 'Scope & Coverage',
  title: 'Threat-to-Evidence Coverage Matrix',
  body: 'Filter by risk category to inspect how OBELUS AI Guard detects threats, enforces inline controls, and captures cryptographic audit proof.',
  filters: [
    { key: 'all', label: 'All Enterprise Threats (6)' },
    { key: 'data', label: 'Shadow AI & Data Leaks' },
    { key: 'agent', label: 'Prompt Injection & Agent Hijack' },
    { key: 'governance', label: 'Compliance & Runaway Spend' },
  ],
  columns: ['Enterprise Threat', 'Detect (Visibility)', 'Enforce (Control)', 'Prove (Audit Evidence)'],
  rows: [
    {
      cat: 'data',
      cells: [
        'Shadow AI',
        'Continuous discovery of AI apps, local models, and MCP servers',
        'Remote browser isolation; block & coach pages',
        'Live knowledge-graph asset inventory',
      ],
    },
    {
      cat: 'data',
      cells: [
        'Data & Secret Leaks',
        'Real-time PII and secret detectors (Aadhaar, PAN, UPI, API keys)',
        'Inline redaction and masking before prompts leave',
        'Flight-recorder entry per masked/blocked event',
      ],
    },
    {
      cat: 'agent',
      cells: [
        'Prompt Injection',
        'Multi-layer detectors on prompts, responses, and documents',
        'Policy-based blocking validated by automated red teaming',
        'Signed rules with an explainable verdict',
      ],
    },
    {
      cat: 'agent',
      cells: [
        'Agent Hijack',
        'Real-time intent verification against the approved task',
        'Human approval gates for high-risk actions; instant kill switch',
        'Full identity chain per tool call and action',
      ],
    },
    {
      cat: 'governance',
      cells: [
        'Compliance Gaps',
        'Session-aware, ontology-based policy reasoning',
        'Automated policy enforcement via signed rules',
        'Exportable, regulator-ready evidence packs',
      ],
    },
    {
      cat: 'governance',
      cells: [
        'Runaway Spend',
        'Granular token and cloud API cost tracking',
        'Hard budgets and automated spending mandates',
        'Complete budget and threshold events in the audit trail',
      ],
    },
  ],
};


