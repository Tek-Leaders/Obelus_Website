/**
 * Stands in for the original `lozad-background` elements, which carried the
 * image on a data-background-image attribute for lozad to apply.
 */
export default function LazyBackground({
  image,
  className = '',
  style,
  children,
  as: Tag = 'div',
  ...rest
}) {
  return (
    <Tag
      className={className}
      style={{ backgroundImage: `url('${image}')`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
