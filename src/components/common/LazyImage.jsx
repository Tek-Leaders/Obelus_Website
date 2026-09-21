/**
 * The original markup renders <img data-src="..." class="lozad"> and relies on
 * the lozad library to promote data-src to src. Without that library the
 * images never load, so this component uses a real src plus the browser's own
 * lazy loading and keeps the `lozad` class for any CSS that targets it.
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
      className={`lozad ${className}`.trim()}
      {...rest}
    />
  );
}
