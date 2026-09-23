import { HONEYPOT_FIELD } from '../../lib/api';

/**
 * Bot trap. Visually hidden and out of the tab order, so only an automated
 * client fills it in; the API rejects any submission that carries a value.
 */
export default function Honeypot({ value, onChange }) {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor={`hp_${HONEYPOT_FIELD}`}>Leave this field empty</label>
      <input
        id={`hp_${HONEYPOT_FIELD}`}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
