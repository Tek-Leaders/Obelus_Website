import { useState } from 'react';
import { EMAIL_PATTERN } from '../../data/formFields';
import LazyBackground from '../common/LazyBackground';

/**
 * The footer subscription form. The submit button ships `disabled` in the
 * original markup and was enabled by the missing form script once the email
 * validated - that gating is reproduced here with controlled state.
 */
export default function FooterSubscribeForm() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const valid = EMAIL_PATTERN.test(email.trim());
  const showError = touched && !valid && email.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (valid) setSubmitted(true);
  };

  const SubmitButton = ({ className, track }) => (
    <button
      type="submit"
      className={`btn btn-primary flex-grow-0 flex-shrink-0 ${className}`}
      disabled={!valid}
      data-analytics={track}
    >
      Sign up <i />
    </button>
  );

  return (
    <LazyBackground
      as="section"
      className="footer-form"
      image="/assets/img/ui/footer-form-bg.svg"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-6">
            <div className="h4 form-title text-white mb-0">
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
              <div className="footer-form-input-container d-flex flex-column">
                <div className="d-flex">
                  <label className="form-field" htmlFor="OBELUS_FOOTER_EMAIL_FIELD">
                    {/*
                      `display: none` is carried over from the original markup
                      and is load-bearing: .sr-only is not positioned out of
                      flow here, so showing this span makes the field 24px
                      taller. The input carries its own aria-label so it still
                      has an accessible name.
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
                      className="form-validation validation serif-sm"
                      role={showError ? 'alert' : undefined}
                    >
                      {showError ? 'Please enter a valid email address.' : ''}
                    </div>
                    <div className="validation-icon" />
                  </label>
                  <div className="actions d-none d-md-block">
                    <SubmitButton
                      className="ml-md-4"
                      track="obelus:footer:Sign up"
                    />
                  </div>
                </div>

                {submitted && (
                  <p className="label-sm text-400 text-white" role="status">
                    Thanks - you are subscribed.
                  </p>
                )}
              </div>

              <div className="legal">
                <p className="label-sm text-400 text-white form-legal">
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

              <div className="mobile-actions d-block d-md-none">
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
