import { useEffect, useRef, useState } from "react";
import {
  footerBottomLinks,
  footerSocials,
  footerLanguages,
  footerCopyright,
} from "../../data/footer";
import LazyImage from "../common/LazyImage";

export default function FooterBottom() {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    if (!langOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    const onPointerDown = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [langOpen]);

  return (
    <footer className="footer-bottom">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 order-md-1 col-xxl-12">
            <div className="obelus-logo d-flex">
              <LazyImage
                src="/assets/img/obelus/obelus.png"
                alt="Obelus - Realtime Security"
              />
            </div>
          </div>

          <div className="col-12 col-md-12 order-md-3 col-xxl-8 order-xxl-2">
            <ul className="list-unstyled bottom-links nav-list d-flex flex-column flex-md-row">
              {footerBottomLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-black"
                    data-page-track="true"
                    data-page-track-value={link.track}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="copyright text-black nav-list mb-3 mb-md-0">
              {footerCopyright}
            </p>
          </div>

          <div className="col-12 col-md-6 order-md-2 col-xxl-4 order-xxl-3">
            <ul className="list-unstyled social-icons d-flex justify-content-start justify-content-md-end align-items-center">
              {footerSocials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    className="social-icon d-flex"
                    aria-label={social.alt}
                    data-page-track="true"
                    data-page-track-value={social.track}
                    rel="noopener noreferrer"
                  >
                    <LazyImage src={social.src} alt={social.alt} />
                  </a>
                </li>
              ))}
              <li>
                <div
                  className={`dropdown ${langOpen ? "show" : ""}`.trim()}
                  ref={langRef}
                >
                  <button
                    className="btn btn-language d-inline-flex align-items-center lozad-background"
                    type="button"
                    id="language_dropdown_menu_button"
                    aria-haspopup="true"
                    aria-expanded={langOpen}
                    aria-label="Select your language"
                    style={{
                      backgroundImage: "url('/assets/img/ui/globe-black.svg')",
                    }}
                    onClick={() => setLangOpen((v) => !v)}
                  >
                    <span className="d-inline-flex">EN</span>
                    <i className="d-inline-flex" />
                  </button>
                  <div
                    className={`dropdown-menu dropdown-menu-right ${langOpen ? "show" : ""}`.trim()}
                    aria-labelledby="language_dropdown_menu_button"
                    hidden={!langOpen}
                  >
                    <span className="h8 title d-flex pb-2">
                      Select your language
                    </span>
                    <ul className="list-unstyled nav-list p-0 d-block d-md-flex flex-wrap">
                      {footerLanguages.map((lang) => (
                        <li key={lang.localTitle}>
                          <a href={lang.localLink}>{lang.localTitle}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
