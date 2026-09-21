import { useState } from 'react';
import { requestDemoForm } from '../../data/requestDemo';
import { jobLevels, EMAIL_PATTERN } from '../../data/formFields';
import Reveal from '../common/Reveal';

const INITIAL = {
  FirstName: '',
  LastName: '',
  Email: '',
  Company: '',
  JobLevel: '',
  Phone: '',
};

const REQUIRED = ['FirstName', 'LastName', 'Email', 'Company', 'JobLevel', 'Phone'];

/**
 * Declared at module scope on purpose - see the identical note in
 * IVLeadForm.jsx and InlineFormSection.jsx. A component defined inside
 * RDForm's render body would be a new type on every keystroke, so React
 * would unmount and remount every field, dropping focus mid-typing.
 */
function Field({ form, name, label, type = 'text', options, autoComplete }) {
  const { values, touched, errorFor, onChange, onBlur } = form;
  const message = touched[name] ? errorFor(name) : '';
  const invalid = Boolean(message);
  const id = `rd_${name}`;

  return (
    <div className="rd-field">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      {options ? (
        <select
          id={id}
          className="rd-input"
          value={values[name]}
          aria-invalid={invalid}
          onChange={onChange(name)}
          onBlur={onBlur(name)}
        >
          <option value="">{label}</option>
          {options.map((o) => (
            <option value={o} key={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className="rd-input"
          placeholder={label}
          autoComplete={autoComplete}
          value={values[name]}
          aria-invalid={invalid}
          onChange={onChange(name)}
          onBlur={onBlur(name)}
        />
      )}
      {invalid && (
        <p className="rd-field-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}

export default function RDForm() {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errorFor = (name) => {
    const value = values[name];
    if (name === 'Email') {
      if (!value.trim()) return 'Business email is required.';
      return EMAIL_PATTERN.test(value.trim()) ? '' : 'Enter a valid email address.';
    }
    return value.trim() ? '' : 'This field is required.';
  };

  const formValid = REQUIRED.every((name) => !errorFor(name));

  const onChange = (name) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };
  const onBlur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(REQUIRED.map((n) => [n, true])));
    if (formValid) setSubmitted(true);
  };

  const form = { values, touched, errorFor, onChange, onBlur };

  return (
    <Reveal delay={150} className="rd-form-panel">
      <p className="rd-form-eyebrow">{requestDemoForm.eyebrow}</p>
      <p className="rd-form-body">{requestDemoForm.body}</p>

      {submitted ? (
        <p className="rd-form-success" role="status">
          Thanks — an OBELUS specialist will reach out shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <Field form={form} name="FirstName" label="First Name" autoComplete="given-name" />
          <Field form={form} name="LastName" label="Last Name" autoComplete="family-name" />
          <Field form={form} name="Email" label="Business Email" type="email" autoComplete="email" />
          <Field form={form} name="Company" label="Company" autoComplete="organization" />
          <Field form={form} name="JobLevel" label="Job level" options={jobLevels} />
          <Field form={form} name="Phone" label="Phone" type="tel" autoComplete="tel" />

          <button type="submit" className="rd-submit" disabled={!formValid}>
            {requestDemoForm.submitLabel}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      )}
    </Reveal>
  );
}
