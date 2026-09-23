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
  eyebrow: 'Our Team',
  title: 'The people behind OBELUS',
  body:
    'Engineers, analysts and security practitioners building and running an AI-driven security operations platform - and working alongside the teams who depend on it.',
};

export const founder = {
  name: 'Venkatesh Kovvuri',
  role: 'Founder & Chief Executive Officer',
  photo: '/assets/img/team/founder-ceo.png',
  bio: [
    'Venkatesh Kovvuri is the Founder and Chief Executive Officer of Obelus, driving the company\u2019s vision to redefine enterprise cyber defense through pioneering Combined Security Management (CSM), SIEM, SOAR, and UEBA capabilities.',
    'With a distinguished career spanning executive leadership across the global technology and software services landscape, Venkatesh brings deep expertise in strategic transformation, global delivery, and enterprise scale. Previously, he served as Executive Vice President of Global Delivery at Cigniti Technologies Ltd., headed Business Transformation for Independent Testing Services at AppLabs (a CSC Company), and led TechnoMinds Cyber Labs as President & CEO. Alongside his extensive enterprise leadership, he has spent over a decade building multi-million-dollar revenue drivers and championing customer-first execution.',
    'Recognizing firsthand the operational fatigue and structural silos security teams face with legacy tool sprawl, he founded Obelus to bridge the gap between complexity and control. Under his leadership, Obelus is empowering Security Operations Centers (SOCs) globally to move away from fragmented point solutions and embrace an intelligent, unified, and behavior-first approach to threat management.',
    'Venkatesh is based in Hyderabad, where he continues to lead Obelus\u2019s mission to secure the digital enterprise of tomorrow.',
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/venkatesh-kovvuri-69096721a/',
    email: '#',
  },
};

export const teams = [
  {
    id: 'engineering',
    title: 'Engineering Team',
    body: 'The engineers who design, build and ship the OBELUS platform - from data pipelines and detection engines to the analyst experience.',
    members: [
      { name: 'Srikanth', role: 'Engineering Lead', photo: '/assets/img/team/srikanth.png', socials: { linkedin: 'https://www.linkedin.com/in/tata-srikanth/', email: '#' } },
      { name: 'Mohan', role: 'Full Stack Engineer', photo: '/assets/img/team/mohan.png', socials: { linkedin: 'https://www.linkedin.com/in/pvs-mohan-24162028b/', email: '#' } },
      { name: 'Ram Teja', role: 'Data Engineer', photo: '/assets/img/team/ram-teja.png', socials: { linkedin: 'https://www.linkedin.com/in/ram-teja-92b9b419b/', email: '#' } },
      { name: 'Chandrashekar', role: 'DevOps Engineer', photo: '/assets/img/team/chandrashekar.png', socials: { linkedin: 'https://www.linkedin.com/in/chandrashekar57/', email: '#' } },
    ],
  },
  {
    id: 'soc',
    title: 'SOC Team',
    body: 'The analysts who monitor, hunt and respond around the clock - and whose day-to-day work shapes how OBELUS detects and investigates threats.',
    members: [
      { name: 'Panduranga Rao', role: 'Head of Security', photo: '/assets/img/team/panduranga-rao.png', socials: { linkedin: 'https://www.linkedin.com/in/pandu-avula-37a34311b/', email: '#' } },
      { name: 'Aman', role: 'Senior SOC Analyst', photo: '/assets/img/team/aman.png', socials: { linkedin: 'https://www.linkedin.com/in/amanshaik20/', email: '#' } },
      { name: 'Rohith', role: 'Threat Hunter', photo: '/assets/img/team/rohith.png', socials: { linkedin: 'https://www.linkedin.com/in/rohith-kumar-arige/', email: '#' } },
      { name: 'Team Member', role: 'Incident Responder', photo: null, socials: { linkedin: 'https://www.linkedin.com/in/sheik-salena-fathima2004/', email: '#' } },
    ],
  },
];
