import { useState } from 'react';
import { EMAIL_PATTERN } from '../../data/formFields';
import LazyBackground from '../common/LazyBackground';
import Honeypot from '../common/Honeypot';
import { submitForm, GENERIC_ERROR } from '../../lib/api';

/**
 * The footer subscription form. The submit button ships `disabled` in the
 * original markup and was enabled by the missing form script once the email
 * validated - that gating is reproduced here with controlled state.
 */
export default function FooterSubscribeForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');

  const valid = EMAIL_PATTERN.test(email.trim());
  const showError = touched && !valid && email.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setFormError('');
    if (!valid || sending) return;

    setSending(true);
    const result = await submitForm('/api/subscribe/', { email, website });
    setSending(false);

    if (result.ok) {
      setSubmitted(true);
      return;
    }
    // One field, so a field-level message and a form-level one read the same.
    setFormError(result.fieldErrors?.email || result.formError || GENERIC_ERROR);
  };

  const SubmitButton = ({ className, track }) => (
    <button
      type="submit"
      className={`btn btn-primary flex-grow-0 flex-shrink-0 ${className}`}
      disabled={!valid || sending}
      aria-busy={sending}
      data-analytics={track}
    >
      {sending ? 'Signing up…' : 'Sign up'} <i />
    </button>
  );

  return (
    <LazyBackground
      as="section"
      className="newsletter"
      image="/assets/img/ui/newsletter-bg.svg"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-6">
            <div className="h4 form-heading text-white mb-0">
              Threat research and OBELUS updates, straight to your inbox
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 col-xxxl-5 offset-xxxl-1">
            <form
              id="newsletter_form"
              name="newsletter_form"
              className="form d-flex flex-wrap"
              method="POST"
              noValidate
              data-lang="en_US"
              onSubmit={handleSubmit}
            >
              <div className="newsletter-field d-flex flex-column">
                <div className="d-flex">
                  <label className="field" htmlFor="OBELUS_FOOTER_EMAIL_FIELD">
                    {/*
                      `display: none` is load-bearing: showing this span makes
                      the field 24px taller. The input carries its own
                      aria-label so it still has an accessible name.
                    */}
                    <span className="sr-only" style={{ display: 'none' }}>
                      Your work email
                    </span>
                    <input
                      type="email"
                      name="Email"
                      required
                      className="mb-md-3 serif-lg text-white"
                      placeholder="Your work email"
                      aria-label="Your work email"
                      id="OBELUS_FOOTER_EMAIL_FIELD"
                      autoComplete="email"
                      value={email}
                      aria-invalid={showError}
                      aria-describedby={showError ? 'footer_email_error' : undefined}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched(true)}
                    />
                    <div
                      id="footer_email_error"
                      className="field-error validation serif-sm"
                      role={showError ? 'alert' : undefined}
                    >
                      {showError ? 'Please enter a valid email address.' : ''}
                    </div>
                    <div className="field-status-icon" />
                  </label>
                  <div className="actions d-none d-md-block">
                    <SubmitButton
                      className="ml-md-4"
                      track="obelus:footer:Sign up"
                    />
                  </div>
                </div>

                <Honeypot value={website} onChange={(e) => setWebsite(e.target.value)} />

                {submitted && (
                  <p className="label-sm text-400 text-white" role="status">
                    Thanks - you are subscribed.
                  </p>
                )}
                {formError && (
                  <p className="label-sm text-400 newsletter-error" role="alert">
                    {formError}
                  </p>
                )}
              </div>

              <div className="legal">
                <p className="label-sm text-400 text-white consent-text">
                  We will only use your details as described in the{' '}
                  <a
                    href="/privacy"
                    data-analytics="obelus:footer:privacy"
                  >
                    Obelus Privacy Statement
                  </a>{' '}
                  and{' '}
                  <a
                    href="/terms"
                    data-analytics="obelus:footer:terms-of-use"
                  >
                    Terms of Use.
                  </a>
                </p>
              </div>

              <div className="newsletter-mobile-actions d-block d-md-none">
                <SubmitButton
                  className="ml-0"
                  track="obelus:footer:mobile:Sign up"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </LazyBackground>
  );
}
