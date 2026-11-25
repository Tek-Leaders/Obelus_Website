// Content for the Our Team page (/team).
//
// Everything on the page comes from this file:
// - `photo`: a path under /public (e.g. '/assets/img/team/jane-doe.png'), or
//   null to show a neutral avatar until a photo is supplied. Portrait photos
//   with a transparent or plain background work best.
// - `socials`: linkedin and/or email. Only links that are filled in
//   are shown, so leave a key out (or set it to '') to hide that icon.
//
// TODO: the email links are still '#' placeholders.

export const teamIntro = {
  eyebrow: 'Leadership',
  title: 'The people behind OBELUS',
};

export const founder = {
  name: 'Venkatesh Kovvuri',
  role: 'Founder & CEO',
  photo: '/assets/img/team/founder-ceo.webp',
  bio: [
    'Venkatesh Kovvuri is the Founder and CEO of Obelus, where he leads the vision to converge enterprise cyber defense and real-time AI governance. By unifying Next Gen SIEM, SOAR, and UEBA within the Obelus Combined Security Management (CSM) platform, and pioneering runtime execution control with Obelus AI Guard, he helps enterprises secure both their core infrastructure and autonomous AI agents.',
    'In addition to his role at Obelus, Venkatesh currently serves as COO at Tek Leaders, bringing over a decade of executive leadership scaling multi million dollar global technology enterprises. Previously, he served as EVP of Global Delivery at Cigniti Technologies Ltd., Head of Business Transformation at AppLabs (a CSC Company), and President & CEO of TechnoMinds Cyber Labs.',
    'Having seen firsthand how tool sprawl overwhelms modern SOCs, and how legacy compliance fails when AI shifts from advising to acting, Venkatesh built Obelus to replace fragmentation with unified, inline control. Operating out of Hyderabad, he leads Obelus\u2019s mission to make the AI driven enterprise resilient, auditable, and secure by design.',
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/venkatesh-kovvuri-69096721a/',
    email: '#',
  },
};

export const teams = [];
