import NetworkBackground from '../components/common/NetworkBackground';
import Reveal from '../components/common/Reveal';
import ContactForm from '../components/contact/ContactForm';
import { contactIntro, offices } from '../data/contact';
import '../styles/contact.css';

const mapHref = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

// Small line icons, drawn here so the page carries no icon dependency.
const PinIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 3.5h3l1.5 4-2.2 1.6a12 12 0 0 0 6.1 6.1l1.6-2.2 4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
  </svg>
);

const MailIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-section">
        <NetworkBackground
          className="contact-bg"
          density={0.00006}
          maxLinkDistance={140}
          dotColor="rgba(110, 165, 255, 1)"
          glowColor="rgba(110, 165, 255, 0.95)"
          lineColor="rgba(110, 165, 255, 0.45)"
          orbColor="rgba(110, 165, 255, 0)"
        />

        <div className="contact-container contact-grid">
          {/* Left: intro and offices */}
          <div className="contact-info">
            <Reveal>
              <p className="contact-eyebrow">{contactIntro.eyebrow}</p>
              <h1 className="contact-title">{contactIntro.title}</h1>
              <p className="contact-lede">{contactIntro.body}</p>
            </Reveal>

            <ul className="contact-offices">
              {offices.map((office, i) => (
                <Reveal as="li" className="contact-office" delay={i * 90} key={office.country}>
                  <h2 className="contact-office-country">{office.country}</h2>
                  <address className="contact-office-details">
                    <span className="contact-line">
                      <PinIcon />
                      <span>
                        {office.address.map((line) => (
                          <span className="contact-address-line" key={line}>
                            {line}
                          </span>
                        ))}
                        {office.mapQuery && (
                          <a
                            className="contact-map-link"
                            href={mapHref(office.mapQuery)}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-analytics={`obelus:contact:map:${office.country.toLowerCase()}`}
                          >
                            View on map
                          </a>
                        )}
                      </span>
                    </span>
                    <span className="contact-line">
                      <PhoneIcon />
                      <a href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}>{office.phone}</a>
                    </span>
                    <span className="contact-line">
                      <MailIcon />
                      <a href={`mailto:${office.email}`}>{office.email}</a>
                    </span>
                  </address>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Right: message form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
