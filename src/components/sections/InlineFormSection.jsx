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
  FirstName: '',
  LastName: '',
  Email: '',
  Company: '',
  Job_Level__c: '',
  Job_Role__c: '',
  Phone: '',
  Country: '',
  State: '',
  zip: '',
  Department: '',
  marketingOptIn: false,
};

const BASE_REQUIRED = [
  'FirstName',
  'LastName',
  'Email',
  'Company',
  'Job_Level__c',
  'Phone',
  'Country',
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
    <label className="form-field" htmlFor={id}>
      <span className="sr-only">{label}</span>
      {options ? (
        <select
          id={id}
          name={name}
          required
          className="mb-md-3 body-sans-1"
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
          className="mb-md-3 body-sans-1"
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
        className="form-validation validation body-serif-4"
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

  const isUS = values.Country === COUNTRY_US;
  const isCanada = values.Country === COUNTRY_CANADA;
  const showDepartment = DEPARTMENT_COUNTRIES.includes(values.Country);

  const errorFor = (name) => {
    const value = values[name];
    if (name === 'Email') {
      if (!value.trim()) return 'Email is required.';
      return EMAIL_PATTERN.test(value.trim()) ? '' : 'Please enter a valid email address.';
    }
    if (name === 'State') {
      if (!isUS && !isCanada) return '';
      return value ? '' : `${isUS ? 'State' : 'Province'} is required.`;
    }
    return String(value ?? '').trim() ? '' : 'This field is required.';
  };

  const required = [
    ...BASE_REQUIRED,
    ...(isUS || isCanada ? ['State'] : []),
    // Only gate on Job Role once it is actually on screen.
    ...(values.Job_Level__c ? ['Job_Role__c'] : []),
  ];
  const formValid = required.every((name) => !errorFor(name));

  const onChange = (name) => (e) => {
    const next = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({
      ...v,
      [name]: next,
      // A country change invalidates whichever sub-region field was showing.
      ...(name === 'Country' ? { State: '', zip: '', Department: '' } : null),
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
    <div className="customBackgroundComp baseComponent parbase section">
      <section
        className="obelus-custom-background customGradient "
        data-custom-type="obelus"
        id="custom_bg_id_1732e5b6-e1f2-41c5-a0c4-720806759490"
      >
        <LazyBackground
          className="lozad-background background-logo center-left   auto"
          image="/assets/img/ui/form-pattern.svg"
        />

        <div className="obelus-custom-background-content" style={{ zIndex: 1 }}>
          <div className="inlineFormComp baseComponent parbase section">
            <span className="page-anchor" id="engage" />
            <section
              className="inline-form   sticky-full-height theme-dark type-twoColumn base-comp-spacer spacer-xlarge tablet-spacer-medium mobile-spacer-small bottom-spacer-large bottom-tablet-spacer-unset bottom-mobile-spacer-unset"
              data-type="obelus"
              data-template="dynamicAllComponents"
              aria-labelledby="engage_heading"
            >
              <div className="container-fluid">
                <div className="row main-row align-items-center">
                  <div className="col-12 col-xl-6">
                    <h2 className="h3 form-title mb-2 text-dark" id="engage_heading">
                      Speak to an <span className="orange-gradient">OBELUS expert</span>
                    </h2>
                    <p className="form-desc body-sans-2 mb-4 text-dark">
                      <span className="h7 text-white">
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
                      id="inline_form"
                      data-lang="en_US"
                      name="inline_form"
                      className="form text-dark"
                      method="POST"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="form-row two d-flex flex-wrap">
                        <Field form={form} name="FirstName" label="First Name" id="formfield0" autoComplete="given-name" />
                        <Field form={form} name="LastName" label="Last Name" id="formfield1" autoComplete="family-name" />
                        <Field form={form} name="Email" label="Email" id="formfield2" type="email" autoComplete="email" />
                        <Field form={form} name="Company" label="Company" id="formfield3" autoComplete="organization" />
                        <Field form={form} name="Job_Level__c" label="Job Level" id="formfield4" options={jobLevels} />
                        {/*
                          Job Role stays hidden until a Job Level is chosen,
                          which keeps the form short on first view.
                        */}
                        {values.Job_Level__c && (
                          <Field form={form} name="Job_Role__c" label="Job Role" id="formfield7" options={jobRoles} />
                        )}
                        <Field form={form} name="Phone" label="Phone" id="formfield5" type="tel" autoComplete="tel" />
                        <Field form={form} name="Country" label="Country" id="formfield6" options={countries} autoComplete="country-name" />
                        {isUS && (
                          <Field form={form} name="State" label="State" id="formfield10" options={usStates} />
                        )}
                        {isCanada && (
                          <Field form={form} name="State" label="Province" id="formfield11" options={canadianProvinces} />
                        )}
                        {isUS && (
                          <Field form={form} name="zip" label="Zip Code" id="formfield15" autoComplete="postal-code" />
                        )}
                        {showDepartment && (
                          <Field form={form} name="Department" label="Department" id="formfield16" />
                        )}
                      </div>

                      <div className="form-row">
                        <label className="checkbox">
                          <span className="checkbox-icon">
                            <input
                              type="checkbox"
                              name="marketingOptIn"
                              checked={values.marketingOptIn}
                              onChange={onChange('marketingOptIn')}
                            />
                            <span className="icon" />
                          </span>
                          <span className="label-2 text-dark">
                            Sign me up to receive news, product updates, sales outreach,
                            event information and special offers about Obelus
                            and its partners.
                          </span>
                        </label>
                      </div>

                      <div className="legal mt-2">
                        <p className="label-2 form-legal text-dark text-500">
                          By submitting this form, I understand my personal data will be
                          processed in accordance with the{' '}
                          <a
                            href="/privacy"
                            data-page-track="true"
                            data-page-track-value="obelus:inlineform:privacy"
                          >
                            Obelus Privacy Statement
                          </a>{' '}
                          and{' '}
                          <a
                            href="/terms"
                            data-page-track="true"
                            data-page-track-value="obelus:inlineform:terms-of-use"
                          >
                            {' '}
                            Terms of Use.{' '}
                          </a>
                        </p>
                      </div>

                      <div className="recaptcha-msg body-sans-4 text-dark text-500 mt-3">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a
                          href="https://policies.google.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms of Service
                        </a>{' '}
                        apply.
                      </div>

                      <div className="actions">
                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                          disabled={!formValid}
                          data-page-track="true"
                          data-page-track-value="obelus:inlineform:Submit"
                        >
                          Submit <i />
                        </button>
                      </div>
                    </form>
                    )}

                    {submitted && (
                      <div className="thank-you-msg" role="status">
                        <h2 className="thank-you-msg-header h3">Success!</h2>
                        <p className="thank-you-msg-body subheading-2">
                          Our associates will reach out to you soon!
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
