/**
 * Section background band: wraps a section so a gradient or solid colour can
 * be painted behind it.
 */
export default function CustomBackground({
  id,
  gradient,
  color,
  variant = 'gradient',
  children,
}) {
  return (
    <div>
      <section
        className={`section-bg ${variant}`.trim()}
        style={gradient ? { backgroundImage: gradient } : { backgroundColor: color }}
        id={id}
      >
        <div className="section-bg-content" style={{ zIndex: 1 }}>
          {children}
        </div>
      </section>
    </div>
  );
}

/** The `<a name="...">` jump targets, as a valid id-based anchor. */
export function PageAnchor({ id }) {
  return <span className="page-anchor" id={id} />;
}
