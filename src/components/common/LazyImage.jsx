/**
 * An <img> that uses the browser's native lazy loading unless `eager` is set.
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  eager = false,
  ...rest
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className || undefined}
      {...rest}
    />
  );
}
