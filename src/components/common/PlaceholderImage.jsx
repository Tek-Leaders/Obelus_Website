import { useState } from 'react';

/**
 * An <img> that swaps to a labelled placeholder box if `src` fails to load —
 * which every path under /public/assets/img/request-demo/ will, until real
 * files are dropped in at those exact names. Once a file exists at that path
 * this renders it normally; nothing else needs to change. The fallback box's
 * look comes from the shared `.img-placeholder` class in
 * styles/placeholder.css.
 */
export default function PlaceholderImage({
  src,
  alt = '',
  className = '',
  label,
  eager = false,
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`img-placeholder ${className}`.trim()} role="img" aria-label={alt}>
        <span>{label || alt || 'Image'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
