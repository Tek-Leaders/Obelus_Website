# Deploying to a Linux server

Ubuntu/Debian assumed. The site and the API are served from **one domain**:
nginx serves the built React files and passes `/api/` and `/admin/` to
gunicorn. That is what makes the frontend's relative `/api/...` calls work
without CORS.

## 1. System packages

```bash
sudo apt update
sudo apt install -y nginx mysql-server python3-venv python3-dev \
                    build-essential pkg-config default-libmysqlclient-dev \
                    nodejs npm
```

`build-essential`, `pkg-config` and `default-libmysqlclient-dev` are for
**mysqlclient**, which compiles against MySQL's C client library. Installing
it without them fails with `Exception: Can not find valid pkg-config name`.
If you would rather avoid the compiler, swap `mysqlclient` for `PyMySQL` in
requirements.txt and add this to `obelus_api/__init__.py`:

```python
import pymysql
pymysql.install_as_MySQLdb()
```

## 2. Database

```bash
sudo mysql < backend/scripts/01_create_database.sql   # edit CHANGE_ME first
```

MySQL 8.0 or later. Note that **Django 6.x requires MySQL 8.4+**, which is why
this project pins Django 5.2 LTS - if your server has 8.4 you may upgrade, but
there is no need to.

## 3. Code and build

```bash
sudo mkdir -p /var/www/obelus && sudo chown -R $USER /var/www/obelus
git clone https://github.com/MohanTEKLD9092/Obelus_Web.git /var/www/obelus
cd /var/www/obelus

# Frontend -> dist/
npm ci
npm run build

# Backend
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements-prod.txt
cp .env.example .env && nano .env      # see below
.venv/bin/python manage.py migrate
.venv/bin/python manage.py collectstatic --noinput
.venv/bin/python manage.py createsuperuser
```

`npm run build` needs ~1 GB of RAM. On a 512 MB VPS it is killed silently -
build locally and copy `dist/` up instead.

## 4. .env for production

```ini
DEBUG=False
SECRET_KEY=<generate a new one, not the development value>
ALLOWED_HOSTS=obelus.in,www.obelus.in
CSRF_TRUSTED_ORIGINS=https://obelus.in,https://www.obelus.in

DB_ENGINE=mysql
DB_NAME=obelus
DB_USER=obelus
DB_PASSWORD=<the app user's password>

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=...
EMAIL_HOST_USER=...
EMAIL_HOST_PASSWORD=...
DEFAULT_FROM_EMAIL=OBELUS Website <noreply@obelus.in>
LEADS_NOTIFY_TO=info@obelus.in

SUBMISSION_RATE=10/hour
```

Generate a key with:

```bash
.venv/bin/python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

Lock the file down - it holds every credential:

```bash
chmod 600 .env && sudo chown www-data:www-data .env
```

Then confirm Django agrees the setup is production-ready:

```bash
.venv/bin/python manage.py check --deploy    # must report no issues
```

## 5. Services

```bash
sudo cp deploy/obelus-api.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now obelus-api

sudo cp deploy/nginx-obelus.conf /etc/nginx/sites-available/obelus
sudo ln -s /etc/nginx/sites-available/obelus /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d obelus.in -d www.obelus.in
```

TLS must be in place **before** you rely on `DEBUG=False`: settings turns on
`SECURE_SSL_REDIRECT`, so plain http requests are redirected to https, and
nginx must pass `X-Forwarded-Proto` (the supplied config does) or the redirect
loops forever.

## 6. Verify

```bash
curl -i https://obelus.in/                      # 200, the React shell
curl -i https://obelus.in/team                  # 200, not 404 - SPA fallback
curl -i -X POST https://obelus.in/api/contact/ \
     -H 'Content-Type: application/json' -d '{"email":"bad"}'   # 400 + field errors
```

Then submit a real form and check the row arrives:

```sql
SELECT id, kind, email, created_at, notified_at FROM obelus.leads_submission
ORDER BY id DESC LIMIT 5;
```

`notified_at` null means the row was saved but the email failed. Fix the mail
settings, then flush the backlog:

```bash
.venv/bin/python manage.py send_pending_notifications
```

## 7. Redeploying

```bash
cd /var/www/obelus && git pull
npm ci && npm run build
cd backend
.venv/bin/pip install -r requirements-prod.txt
./scripts/migrate.sh --check    # stops if a model changed without a migration
./scripts/migrate.sh
.venv/bin/python manage.py collectstatic --noinput
sudo systemctl restart obelus-api
```

## Things that will bite you

- **Case sensitivity.** Linux filesystems are case-sensitive; Windows is not.
  `Logo.png` and `logo.png` are the same file on your machine and different
  ones on the server. All current imports and asset paths have been checked
  and match exactly - keep it that way.
- **Line endings.** `.gitattributes` forces LF in the repository, so shell
  scripts work on the server. Without it a `.sh` file saved on Windows fails
  with `bad interpreter: /bin/bash^M`.
- **The repository is ~45 MB**, mostly the product tour video. Clones are slow
  but fine; if you later move the video to a CDN, the clone drops to ~5 MB.
- **`.env` is not in the repository** by design. A fresh clone will not run
  until you create it.
