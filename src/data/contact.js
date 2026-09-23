// Content for the Contact Us page (/contact).
//
// Each office lists its address as separate lines, plus a phone number and
// email. `mapQuery` is the text handed to Google Maps for the "View on map"
// link; leave it out to hide that link.

export const contactIntro = {
  eyebrow: 'Contact Us',
  title: 'Talk to the OBELUS team',
  body: 'Tell us what you need and we will get back to you. You can also reach any of our offices directly.',
};

export const offices = [
  {
    country: 'India',
    address: ['Sarvotham, Plot No. 12, Deloitte Drive,', 'Phase 2, HITEC City,', 'Hyderabad, Telangana 500081'],
    phone: '+1 214 851 2396',
    email: 'info@obelus.in',
    mapQuery: 'Sarvotham, Plot No. 12, Deloitte Drive, Phase 2, HITEC City, Hyderabad, Telangana 500081',
  },
  {
    country: 'USA',
    address: ['5151 Headquarters Drive, Suite: 105', 'Plano, TX 75024'],
    phone: '+1 214 851 2396',
    email: 'info@obelus.in',
    mapQuery: '5151 Headquarters Drive, Suite 105, Plano, TX 75024',
  },
  {
    country: 'Canada',
    address: ['68 Copperstone Villas SE,', 'Calgary, Alberta, T2Z 5E3'],
    phone: '+1 214 851 2396',
    email: 'info@obelus.in',
    mapQuery: '68 Copperstone Villas SE, Calgary, Alberta, T2Z 5E3',
  },
];

export const contactForm = {
  eyebrow: 'Send us a message',
  body: 'Fields marked with * are required.',
  submitLabel: 'Send message',
  success: 'Thanks — your message is on its way. An OBELUS specialist will reply shortly.',
};
