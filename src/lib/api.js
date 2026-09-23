/**
 * Posting the site's forms to the Django backend.
 *
 * Paths are relative (`/api/...`): in production the site and the API are
 * served from the same domain, and in development vite.config.js proxies
 * /api to the Django dev server. Neither case needs an API host in the
 * frontend, and neither involves CORS.
 */

// Shown when the request never reached the server, or the server failed in a
// way that says nothing useful to a visitor.
export const GENERIC_ERROR =
  'Something went wrong sending your message. Please try again, or email info@obelus.in.';

const RATE_LIMIT_ERROR =
  'Too many submissions from this connection. Please try again later, or email info@obelus.in.';

/**
 * POSTs `values` as JSON and normalises every outcome into one shape:
 *
 *   { ok: true }                          - stored
 *   { ok: false, fieldErrors: {...} }     - per-field validation messages
 *   { ok: false, formError: 'message' }   - something the whole form shows
 *
 * It never throws, so a caller only has to handle those three cases.
 */
export async function submitForm(path, values) {
  let response;
  try {
    response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  } catch {
    // Offline, DNS failure, connection refused - the request never landed.
    return { ok: false, formError: GENERIC_ERROR };
  }

  if (response.ok) return { ok: true };

  if (response.status === 429) return { ok: false, formError: RATE_LIMIT_ERROR };

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (response.status === 400 && body && typeof body === 'object') {
    // DRF answers { field: ["message", ...] }. Flatten to { field: "message" }
    // so it drops straight into the forms' existing error display. The
    // honeypot rejection comes back under `website`, which no visitor can
    // see, so it is reported as a general failure instead.
    const fieldErrors = {};
    let formError = '';
    Object.entries(body).forEach(([key, value]) => {
      const message = Array.isArray(value) ? value[0] : String(value);
      if (key === 'website' || key === 'non_field_errors' || key === 'detail') {
        formError = key === 'website' ? GENERIC_ERROR : message;
      } else {
        fieldErrors[key] = message;
      }
    });
    if (Object.keys(fieldErrors).length || formError) {
      return { ok: false, fieldErrors, formError };
    }
  }

  return { ok: false, formError: GENERIC_ERROR };
}

/**
 * The hidden field that catches bots. Real people never see it, so anything
 * that fills it in is rejected server-side. Kept here so every form spells it
 * the same way the serializer expects.
 */
export const HONEYPOT_FIELD = 'website';
