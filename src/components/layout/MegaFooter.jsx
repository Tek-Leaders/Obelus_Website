import { useState } from 'react';
import { footerColumns } from '../../data/footer';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const COLUMN_WIDTHS = [
  'col-12 col-md-16 col-xxl-8',
  'col-12 col-md-4 col-xxl-2',
  'col-12 col-md-4 col-xxl-2',
];

/**
 * Replaces the Bootstrap collapse accordion (data-toggle / data-parent).
 * At >=md, `d-md-flex` wins over `.collapse:not(.show)`, so the columns are
 * always visible on desktop and only the mobile headings toggle - the same
 * behaviour the original stylesheet produced.
 */
export default function MegaFooter() {
  const [openIndex, setOpenIndex] = useState(null);
  // Above md the columns are always shown and site/footer.css sets the heading to
  // `pointer-events: none`, so it must not be a control at all up there.
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <section className="mega-footer accordion" id="footer_accordion">
      <div className="container-fluid">
        <div className="row">
          {footerColumns.map((column, i) => {
            const open = openIndex === i;
            const panelId = `collapse_col_${i}`;
            return (
              <div className={COLUMN_WIDTHS[i]} key={column.heading}>
                {isDesktop ? (
                  <div className="heading-col pr-4 pr-md-0">
                    <h2 className="nav-headline mb-0">{column.heading}</h2>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={`heading-col pr-4 pr-md-0 ${open ? '' : 'collapsed'}`.trim()}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <h2 className="nav-headline mb-0">{column.heading}</h2>
                  </button>
                )}
                <div
                  id={panelId}
                  className={`columns collapse d-md-flex flex-nowrap ${open ? 'show' : ''}`.trim()}
                >
                  {column.groups.map((group, gi) => (
                    <ul className="list-unstyled nav-list mb-0" key={gi}>
                      {group.map((link) => (
                        <li
                          className={link.sub ? 'sub-title nav-subheader' : 'link'}
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
