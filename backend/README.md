# OBELUS backend

Django + DRF API behind the marketing site's four forms. Submissions are
stored in MySQL and emailed to the team.

## Important: use the virtualenv

The dependencies live in `backend/.venv`, not in your global Python. Running
`python manage.py ...` with the global interpreter fails with
`ModuleNotFoundError: No module named 'environ'`.

```powershell
cd backend

# Either call the venv's python directly (no activation needed)
.\.venv\Scripts\python.exe manage.py runserver

# ...or activate it first, then plain `python` is the venv's
.\.venv\Scripts\Activate.ps1
python manage.py runserver
```

`Activate.ps1` blocked? Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
once, or just use the direct path.

Django is pinned to the **5.2 LTS** line: 6.x requires MySQL 8.4+, and this
machine runs MySQL 8.0.

## First-time setup on a new machine

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
copy .env.example .env      # then fill it in
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py createsuperuser
```

## Endpoints

One per form, all `POST`, all public:

| Path | Form |
|------|------|
| `/api/contact/`   | Contact Us |
| `/api/demo/`      | Request a demo |
| `/api/lead/`      | Speak to an expert (home page) |
| `/api/subscribe/` | Footer newsletter |

`201 {"ok": true}` on success, `400 {field: [message]}` on validation failure,
`429` when rate limited.

The React app posts to these as relative `/api/...` paths. In development
`vite.config.js` proxies them here; in production the site and this API are
served from the same domain. Neither needs CORS.

## Lead inbox

`http://127.0.0.1:8000/admin/` - filter by form type or date, search, export
CSV. Records are read-only by design.

## Email

Development prints mail to the console. To send for real, set in `.env`:

```
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=...        # e.g. smtp.zoho.in
EMAIL_HOST_USER=...
EMAIL_HOST_PASSWORD=... # an app password, never the mailbox password
```

The From address is always an OBELUS mailbox; the visitor's address goes in
Reply-To. Sending as the visitor's domain would fail SPF/DMARC and get the
mail dropped. `obelus.in` needs SPF, DKIM and DMARC records published or the
notifications will land in spam.

If mail is down, submissions are still saved with `notified_at` null. Flush
the backlog once it is fixed:

```powershell
.\.venv\Scripts\python.exe manage.py send_pending_notifications
```

## Database migrations

The schema is defined by `leads/models.py`. Django generates and tracks the
migrations; `leads/migrations/0001_initial.py` is what created the current
table.

```powershell
.\scripts\migrate.ps1           # apply pending migrations
.\scripts\migrate.ps1 -Make     # generate them from model changes, then apply
.\scripts\migrate.ps1 -Check    # exit non-zero if a model change has no migration
```

The wrapper always uses `.venv`'s python, which is the usual cause of a failed
migrate. `-Check` belongs in CI or a pre-deploy step: it catches a model edited
without its migration, which would otherwise surface as a column-missing error
in production.

### Provisioning a new server

```bash
mysql -u root -p < scripts/01_create_database.sql   # edit CHANGE_ME first
python manage.py migrate
```

`scripts/schema.sql` is a plain-SQL export of every table, for review or for a
host where Django cannot be run. It is a **reference, not the source of
truth** - regenerate it with `python scripts/export_schema.py` after any model
change. If you ever apply it by hand, follow with `python manage.py migrate
--fake` so Django does not try to create the tables a second time.

## Before deploying

- `manage.py check --deploy` must be clean
- set `DEBUG=False`, a real `SECRET_KEY`, and explicit `ALLOWED_HOSTS`
- set `SUBMISSION_RATE` back to `10/hour` (local `.env` uses a loose value)
- `.env` is gitignored and must never be committed
