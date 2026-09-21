/**
 * An element (a <div> by default) with a background image.
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
