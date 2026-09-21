import { useReveal } from '../../hooks/useReveal';

/**
 * Wraps children in a div that fades/slides into place the first time it
 * scrolls into view. `delay` (ms) staggers siblings in a grid or row.
 * The `.reveal`/`.revealed` classes come from styles/reveal.css, imported
 * once globally — every page using this component shares that animation.
 */
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, ...rest }) {
  const [ref, revealed] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${revealed ? 'revealed' : ''} ${className}`.trim()}
      style={{ transitionDelay: revealed ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
