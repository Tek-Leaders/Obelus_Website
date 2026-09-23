/**
 * SIEM, SOAR and UEBA feeding one Combined Security Management hub. Drawn as
 * an SVG so it scales cleanly; the text is real text for screen readers.
 */
export default function PlatformDiagram({ hub, nodes }) {
  // Node centres around the hub (viewBox 400 x 380).
  const positions = [
    { x: 200, y: 58 },
    { x: 66, y: 300 },
    { x: 334, y: 300 },
  ];
  const hubPos = { x: 200, y: 200 };

  return (
    <figure className="about-diagram">
      <svg viewBox="0 0 400 380" role="img" aria-labelledby="about_diagram_title">
        <title id="about_diagram_title">
          {`${nodes.map((n) => n.label).join(', ')} unified in ${hub.caption} (${hub.label})`}
        </title>
        <defs>
          {/* userSpaceOnUse: a perfectly vertical line has a zero-width bounding
              box, so an objectBoundingBox gradient would not render on it. */}
          <linearGradient id="about-link" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="380">
            <stop offset="0" stopColor="#00c65e" stopOpacity="0.9" />
            <stop offset="1" stopColor="#3a7ae0" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="about-hub" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#123a2a" />
            <stop offset="1" stopColor="#0b1422" />
          </radialGradient>
        </defs>

        {/* Links */}
        {positions.map((p, i) => (
          <line
            key={`l${i}`}
            className="about-diagram-link"
            style={{ "--i": i }}
            x1={p.x}
            y1={p.y}
            x2={hubPos.x}
            y2={hubPos.y}
            stroke="url(#about-link)"
          />
        ))}

        {/* Outer ring */}
        <circle cx={hubPos.x} cy={hubPos.y} r="150" className="about-diagram-ring" />

        {/* Hub */}
        <circle cx={hubPos.x} cy={hubPos.y} r="62" fill="url(#about-hub)" className="about-diagram-hub" />
        <text x={hubPos.x} y={hubPos.y + 2} className="about-diagram-hub-label">
          {hub.label}
        </text>
        <text x={hubPos.x} y={hubPos.y + 26} className="about-diagram-hub-caption">
          Combined Security
        </text>
        <text x={hubPos.x} y={hubPos.y + 40} className="about-diagram-hub-caption">
          Management
        </text>

        {/* Capability nodes */}
        {nodes.map((n, i) => {
          const p = positions[i];
          return (
            <g key={n.label} className="about-diagram-node" style={{ "--i": i }}>
              <rect x={p.x - 52} y={p.y - 30} width="104" height="60" rx="14" />
              <text x={p.x} y={p.y - 2} className="about-diagram-node-label">
                {n.label}
              </text>
              <text x={p.x} y={p.y + 17} className="about-diagram-node-caption">
                {n.caption}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
