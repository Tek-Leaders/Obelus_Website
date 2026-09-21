import { useState } from 'react';
import {
  jobLevels,
  jobRoles,
  countries,
  usStates,
  canadianProvinces,
  COUNTRY_US,
  COUNTRY_CANADA,
  DEPARTMENT_COUNTRIES,
  EMAIL_PATTERN,
} from '../../data/formFields';
import LazyBackground from '../common/LazyBackground';

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  jobLevel: '',
  jobRole: '',
  phone: '',
  country: '',
  state: '',
  postalCode: '',
  department: '',
  marketingOptIn: false,
};

const BASE_REQUIRED = [
  'firstName',
  'lastName',
  'email',
  'company',
  'jobLevel',
  'phone',
  'country',
];

/**
 * Declared at module scope on purpose: a component defined inside the render
 * body would be a new type on every keystroke, so React would unmount and
 * remount the input and the field would lose focus mid-typing.
 */
function Field({ form, name, label, id, type = 'text', options, autoComplete }) {
  const { values, touched, errorFor, onChange, onBlur } = form;
  const message = touched[name] ? errorFor(name) : '';
  const invalid = Boolean(message);
  const describedBy = invalid ? `${id}_error` : undefined;

  return (
    <label className="field" htmlFor={id}>
      <span className="sr-only">{label}</span>
      {options ? (
        <select
          id={id}
          name={name}
          required
          className="mb-md-3 text-lg"
          value={values[name]}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={onChange(name)}
          onBlur={onBlur(name)}
        >
          <option value="">{label}</option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          className="mb-md-3 text-lg"
          placeholder={label}
          autoComplete={autoComplete}
          value={values[name]}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={onChange(name)}
          onBlur={onBlur(name)}
        />
      )}
      <div
        id={`${id}_error`}
        className="field-error validation serif-sm"
        role={invalid ? 'alert' : undefined}
      >
        {message}
      </div>
    </label>
  );
}

/**
 * "Talk to an OBELUS expert" lead form. Validation, enabling the submit
 * button, and revealing the State / Province / Zip / Department fields for the
 * countries that need them are all handled here in React state.
 */
export default function InlineFormSection() {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isUS = values.country === COUNTRY_US;
  const isCanada = values.country === COUNTRY_CANADA;
  const showDepartment = DEPARTMENT_COUNTRIES.includes(values.country);

  const errorFor = (name) => {
    const value = values[name];
    if (name === 'email') {
      if (!value.trim()) return 'Email is required.';
      return EMAIL_PATTERN.test(value.trim()) ? '' : 'Please enter a valid email address.';
    }
    if (name === 'state') {
      if (!isUS && !isCanada) return '';
      return value ? '' : `${isUS ? 'State' : 'Province'} is required.`;
    }
    return String(value ?? '').trim() ? '' : 'This field is required.';
  };

  const required = [
    ...BASE_REQUIRED,
    ...(isUS || isCanada ? ['state'] : []),
    // Only gate on Job Role once it is actually on screen.
    ...(values.jobLevel ? ['jobRole'] : []),
  ];
  const formValid = required.every((name) => !errorFor(name));

  const onChange = (name) => (e) => {
    const next = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({
      ...v,
      [name]: next,
      // A country change invalidates whichever sub-region field was showing.
      ...(name === 'country' ? { state: '', postalCode: '', department: '' } : null),
    }));
  };

  const onBlur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const form = { values, touched, errorFor, onChange, onBlur };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(required.map((n) => [n, true])));
    if (formValid) setSubmitted(true);
  };

  return (
    <div>
      <section
        className="section-bg gradient"
      >
        <LazyBackground
          className="section-bg-image"
          image="/assets/img/ui/form-pattern.svg"
        />

        <div className="section-bg-content" style={{ zIndex: 1 }}>
          <div>
            <span className="anchor" id="engage" />
            <section
              className="lead-form theme-dark two-column section-space pad-top-xl tablet-pad-top-md mobile-pad-top-sm pad-bottom-lg"
              data-type="obelus"
              aria-labelledby="engage_heading"
            >
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-12 col-xl-6">
                    <h2 className="h3 form-heading mb-2 text-dark" id="engage_heading">
                      Speak to an <span className="accent-text">OBELUS expert</span>
                    </h2>
                    <p className="form-intro text-md mb-4 text-dark">
                      <span className="heading-sm text-white">
                        Your security challenges deserve expert answers. Get a tailored
                        demo and see how OBELUS helps your team detect, investigate and
                        respond faster.
                      </span>
                    </p>
                  </div>

                  <div className="col-12 col-xl-6">
                  <div className="engage-form-panel">
                    {!submitted && (
                    <form
                      id="lead_form"
                      data-lang="en_US"
                      name="lead_form"
                      className="form text-dark"
                      method="POST"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="field-row stacked d-flex flex-wrap">
                        <Field form={form} name="firstName" label="First Name" id="lead_first_name" autoComplete="given-name" />
                        <Field form={form} name="lastName" label="Last Name" id="lead_last_name" autoComplete="family-name" />
                        <Field form={form} name="email" label="Email" id="lead_email" type="email" autoComplete="email" />
                        <Field form={form} name="company" label="Company" id="lead_company" autoComplete="organization" />
                        <Field form={form} name="jobLevel" label="Job Level" id="lead_job_level" options={jobLevels} />
                        {/*
                          Job Role stays hidden until a Job Level is chosen,
                          which keeps the form short on first view.
                        */}
                        {values.jobLevel && (
                          <Field form={form} name="jobRole" label="Job Role" id="lead_job_role" options={jobRoles} />
                        )}
                        <Field form={form} name="phone" label="Phone" id="lead_phone" type="tel" autoComplete="tel" />
                        <Field form={form} name="country" label="Country" id="lead_country" options={countries} autoComplete="country-name" />
                        {isUS && (
                          <Field form={form} name="state" label="State" id="lead_state" options={usStates} />
                        )}
                        {isCanada && (
                          <Field form={form} name="state" label="Province" id="lead_province" options={canadianProvinces} />
                        )}
                        {isUS && (
                          <Field form={form} name="postalCode" label="Zip Code" id="lead_postal_code" autoComplete="postal-code" />
                        )}
                        {showDepartment && (
                          <Field form={form} name="department" label="Department" id="lead_department" />
                        )}
                      </div>

                      <div className="field-row">
                        <label className="checkbox">
                          <span className="checkbox-box">
                            <input
                              type="checkbox"
                              name="marketingOptIn"
                              checked={values.marketingOptIn}
                              onChange={onChange('marketingOptIn')}
                            />
                            <span className="icon" />
                          </span>
                          <span className="label text-dark">
                            Send me OBELUS product news, research and event invitations. I
                            can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <div className="legal mt-2">
                        <p className="label consent-text text-dark text-500">
                          We will only use your details as described in the{' '}
                          <a
                            href="/privacy"
                            data-analytics="obelus:inlineform:privacy"
                          >
                            Obelus Privacy Statement
                          </a>{' '}
                          and{' '}
                          <a
                            href="/terms"
                            data-analytics="obelus:inlineform:terms-of-use"
                          >
                            {' '}
                            Terms of Use.{' '}
                          </a>
                        </p>
                      </div>

                      <div className="actions">
                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                          disabled={!formValid}
                          data-analytics="obelus:inlineform:Submit"
                        >
                          Submit <i />
                        </button>
                      </div>
                    </form>
                    )}

                    {submitted && (
                      <div className="form-success" role="status">
                        <h2 className="form-success-title h3">Success!</h2>
                        <p className="form-success-body subheading">
                          Thanks - an OBELUS specialist will be in touch shortly.
                        </p>
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
