import { useState } from 'react';
import { footerColumns } from '../../data/footer';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const COLUMN_WIDTHS = [
  'col-12 col-xxl-8',
  'col-12 col-md-4 col-xxl-2',
  'col-12 col-md-4 col-xxl-2',
];

/**
 * Footer link columns. Below 768px each column is an accordion; at >=md,
 * `d-md-flex` wins over `.collapse:not(.show)`, so the columns are always
 * visible and only the mobile headings toggle.
 */
export default function MegaFooter() {
  const [openIndex, setOpenIndex] = useState(null);
  // Above md the columns are always shown and site/footer.css sets the heading to
  // `pointer-events: none`, so it must not be a control at all up there.
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <section className="footer-links accordion" id="footer_link_columns">
      <div className="container-fluid">
        <div className="row">
          {footerColumns.map((column, i) => {
            const open = openIndex === i;
            const panelId = `footer_col_${i}`;
            return (
              <div className={COLUMN_WIDTHS[i]} key={column.heading}>
                {isDesktop ? (
                  <div className="footer-col-heading pr-4 pr-md-0">
                    <h2 className="footer-heading mb-0">{column.heading}</h2>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={`footer-col-heading pr-4 pr-md-0 ${open ? '' : 'collapsed'}`.trim()}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <h2 className="footer-heading mb-0">{column.heading}</h2>
                  </button>
                )}
                <div
                  id={panelId}
                  className={`columns collapse d-md-flex flex-nowrap ${open ? 'show' : ''}`.trim()}
                >
                  {column.groups.map((group, gi) => (
                    <ul className="list-unstyled footer-text mb-0" key={gi}>
                      {group.map((link) => (
                        <li
                          className={link.sub ? 'link-group-title footer-subheading' : 'link'}
                          key={link.track || link.href + link.label}
                        >
                          <a
                            href={link.href}
                            className="d-flex d-md-inline text-black"
                            target={link.target}
                            data-analytics={link.track}
                            rel="noopener"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
