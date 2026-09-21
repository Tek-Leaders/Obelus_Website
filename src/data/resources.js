// The "Featured resources" carousel on the landing page.
//
// NOTE: `href` is '#' on every card because these pages do not exist yet, and
// the images point into /public/assets/img/resources/, which is empty — the
// cards render a labelled placeholder box until you add real files. Swap in
// real URLs and artwork before publishing.

export const resourcesHeading = {
  titleParts: [{ text: 'Featured ' }, { text: 'resources', gradient: true }],
};

export const resourceCards = [
  {
    eyebrow: 'Solution brief',
    title: 'The OBELUS unified SOC platform',
    cta: 'Download the brief',
    href: '#',
    target: '_self',
    image: '/assets/img/resources/solution-brief.png',
    overlay: true,
    track: 'obelus:resources:card-0:solution brief',
  },
  {
    eyebrow: 'Blog',
    title: 'Why AI SOC agents are only as good as the context they can see',
    cta: 'Read the blog',
    href: '#',
    target: '_self',
    image: '/assets/img/resources/ai-soc-context.png',
    track: 'obelus:resources:card-1:ai soc context',
  },
  {
    eyebrow: 'Blog',
    title: 'Every detection needs a next step: closing the investigation gap',
    cta: 'Read the blog',
    href: '#',
    target: '_self',
    image: '/assets/img/resources/investigation-gap.png',
    track: 'obelus:resources:card-2:investigation gap',
  },
  {
    eyebrow: 'Report',
    title: 'AI transparency: how OBELUS handles your data',
    cta: 'Read the report',
    href: '#',
    target: '_self',
    image: '/assets/img/resources/ai-transparency.png',
    track: 'obelus:resources:card-3:ai transparency',
  },
  {
    eyebrow: 'Case study',
    title: 'Running a 24/7 SOC for SMB customers on OBELUS',
    cta: 'Read the case study',
    href: '#',
    target: '_self',
    image: '/assets/img/resources/mssp-case-study.png',
    track: 'obelus:resources:card-4:mssp case study',
  },
  {
    eyebrow: 'Use case',
    title: 'OBELUS for MSSP and MDR providers',
    cta: 'See the use case',
    href: '#',
    target: '_self',
    image: '/assets/img/resources/mssp-use-case.png',
    track: 'obelus:resources:card-5:mssp use case',
  },
];
