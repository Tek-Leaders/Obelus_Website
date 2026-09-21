/**
 * Renders a heading built from parts, where flagged parts get the
 * `orange-gradient` span used throughout the original page.
 */
export default function GradientText({ parts }) {
  return (
    <>
      {parts.map((part, i) =>
        part.gradient ? (
          <span key={i} className="orange-gradient">
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}
