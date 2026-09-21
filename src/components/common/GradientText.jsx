/**
 * Renders a heading built from parts, where flagged parts get the
 * `accent-text` gradient span.
 */
export default function GradientText({ parts }) {
  return (
    <>
      {parts.map((part, i) =>
        part.gradient ? (
          <span key={i} className="accent-text">
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}
