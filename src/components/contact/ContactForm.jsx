import { useState } from 'react';
import Reveal from '../common/Reveal';
import Honeypot from '../common/Honeypot';
import { contactForm } from '../../data/contact';
import { EMAIL_PATTERN } from '../../data/formFields';
import { submitForm } from '../../lib/api';

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  website: '',
};

const REQUIRED = ['firstName', 'lastName', 'email', 'message'];

/**
 * Declared at module scope on purpose: a component defined inside the render
 * body would be a new type on every keystroke, so React would unmount and
 * remount the field and it would lose focus mid-typing.
 */
function Field({ form, name, label, type = 'text', autoComplete, required, textarea }) {
  const { values, touched, errorFor, onChange, onBlur } = form;
  const message = touched[name] ? errorFor(name) : '';
  const invalid = Boolean(message);
  const id = `contact_${name}`;
  const shared = {
    id,
    className: 'contact-input',
    value: values[name],
    'aria-invalid': invalid,
    'aria-describedby': invalid ? `${id}_error` : undefined,
    onChange: onChange(name),
    onBlur: onBlur(name),
  };

  return (
    <div className={`contact-field${textarea ? ' contact-field-wide' : ''}`}>
      <label className="contact-label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {textarea ? (
        <textarea {...shared} rows={5} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      {invalid && (
        <p className="contact-field-error" id={`${id}_error`} role="alert">
          {message}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  // Validation messages the server sent back, cleared as soon as the visitor
  // edits that field.
  const [serverErrors, setServerErrors] = useState({});
  const [formError, setFormError] = useState('');

  const errorFor = (name) => {
    if (serverErrors[name]) return serverErrors[name];
    const value = values[name];
    if (!REQUIRED.includes(name)) return '';
    if (name === 'email') {
      if (!value.trim()) return 'Email address is required.';
      return EMAIL_PATTERN.test(value.trim()) ? '' : 'Enter a valid email address.';
    }
    return value.trim() ? '' : 'This field is required.';
  };

  const formValid = REQUIRED.every((name) => !errorFor(name));

  const onChange = (name) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setServerErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
  };
  const onBlur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(REQUIRED.map((n) => [n, true])));
    setFormError('');
    if (!formValid || sending) return;

    setSending(true);
    const result = await submitForm('/api/contact/', values);
    setSending(false);

    if (result.ok) {
      setSubmitted(true);
      return;
    }
    // Mark every field the server complained about as touched, or its
    // message would not be shown.
    if (result.fieldErrors) {
      setServerErrors(result.fieldErrors);
      setTouched((t) => ({
        ...t,
        ...Object.fromEntries(Object.keys(result.fieldErrors).map((n) => [n, true])),
      }));
    }
    if (result.formError) setFormError(result.formError);
  };

  const form = { values, touched, errorFor, onChange, onBlur };

  return (
    <Reveal className="contact-form-panel" delay={120}>
      <p className="contact-form-eyebrow">{contactForm.eyebrow}</p>
      <p className="contact-form-body">{contactForm.body}</p>

      {submitted ? (
        <p className="contact-form-success" role="status">
          {contactForm.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="contact-field-grid">
            <Field form={form} name="firstName" label="First name" autoComplete="given-name" required />
            <Field form={form} name="lastName" label="Last name" autoComplete="family-name" required />
            <Field form={form} name="email" label="Work email" type="email" autoComplete="email" required />
            <Field form={form} name="company" label="Company" autoComplete="organization" />
            <Field form={form} name="phone" label="Phone" type="tel" autoComplete="tel" />
            <Field form={form} name="message" label="How can we help?" textarea required />
          </div>

          <Honeypot value={values.website} onChange={onChange('website')} />

          {formError && (
            <p className="contact-form-error" role="alert">
              {formError}
            </p>
          )}

          {/* Enabled unless a request is in flight: submitting an incomplete
              form marks the fields touched and shows what is missing. */}
          <button type="submit" className="contact-submit" disabled={sending} aria-busy={sending}>
            {sending ? 'Sending…' : contactForm.submitLabel}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>
      )}
    </Reveal>
  );
}
