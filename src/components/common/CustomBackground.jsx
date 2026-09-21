/**
 * The `obelus-custom-background` wrapper the original page repeats between
 * sections to paint the gradient bands behind them.
 */
export default function CustomBackground({
  id,
  gradient,
  color,
  variant = 'customGradient',
  children,
}) {
  return (
    <div className="customBackgroundComp baseComponent parbase section">
      <section
        className={`obelus-custom-background ${variant} `}
        style={gradient ? { backgroundImage: gradient } : { backgroundColor: color }}
        data-custom-type="obelus"
        id={id}
      >
        <div className="obelus-custom-background-content" style={{ zIndex: 1 }}>
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
