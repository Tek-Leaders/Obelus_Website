"""
Django settings for the OBELUS website backend.

Every deployment-specific value is read from the environment (see
.env.example); nothing secret is committed. `python manage.py check
--deploy` before going live.
"""

from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, []),
    CORS_ALLOWED_ORIGINS=(list, []),
    DB_ENGINE=(str, 'sqlite'),
    EMAIL_BACKEND=(str, 'django.core.mail.backends.console.EmailBackend'),
    EMAIL_PORT=(int, 587),
    EMAIL_USE_TLS=(bool, True),
    LEADS_NOTIFY_TO=(list, ['info@obelus.in']),
    LEADS_SEND_ACKNOWLEDGEMENT=(bool, True),
    SUBMISSION_RATE=(str, '10/hour'),
)
environ.Env.read_env(BASE_DIR / '.env')

# SECURITY: unsafe fallback is for local development only. Deployment sets a
# real key; `check --deploy` fails loudly if this one is left in place.
SECRET_KEY = env('SECRET_KEY', default='dev-only-insecure-key-change-me')
DEBUG = env('DEBUG')
ALLOWED_HOSTS = env('ALLOWED_HOSTS') or (['*'] if DEBUG else [])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'leads',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # Must sit above CommonMiddleware so preflight responses carry the headers.
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'obelus_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'obelus_api.wsgi.application'

# ---------------------------------------------------------------- database
# MySQL in every real environment. SQLite is the default only so the project
# runs on a fresh clone without a database server; set DB_ENGINE=mysql.
if env('DB_ENGINE') == 'mysql':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'HOST': env('DB_HOST', default='127.0.0.1'),
            'PORT': env('DB_PORT', default='3306'),
            'OPTIONS': {
                'charset': 'utf8mb4',
                # Surfaces truncation and bad dates as errors instead of
                # silently storing mangled data.
                'sql_mode': 'STRICT_TRANS_TABLES',
            },
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = env('TIME_ZONE', default='Asia/Kolkata')
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ------------------------------------------------------------- rest framework
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {'submissions': env('SUBMISSION_RATE')},
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer'],
}

# ---------------------------------------------------------------------- CORS
# Only needed when the API is served from a different origin than the site.
# Deploying Django behind the same domain (obelus.in/api/) avoids this
# entirely - leave the list empty in that case.
CORS_ALLOWED_ORIGINS = env('CORS_ALLOWED_ORIGINS')
CORS_ALLOW_CREDENTIALS = False

# --------------------------------------------------------------------- email
# Defaults to the console backend so development prints mail instead of
# sending it. Production sets EMAIL_BACKEND to the SMTP one.
EMAIL_BACKEND = env('EMAIL_BACKEND')
EMAIL_HOST = env('EMAIL_HOST', default='')
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_USE_TLS = env('EMAIL_USE_TLS')
EMAIL_HOST_USER = env('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD', default='')
EMAIL_TIMEOUT = 20

# The From address is always an OBELUS mailbox - never the visitor's, which
# would fail SPF/DMARC for their domain. The visitor's address goes in
# Reply-To instead (see leads/emails.py).
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='OBELUS Website <noreply@obelus.in>')
LEADS_NOTIFY_TO = env('LEADS_NOTIFY_TO')
LEADS_SEND_ACKNOWLEDGEMENT = env('LEADS_SEND_ACKNOWLEDGEMENT')

# ----------------------------------------------------------------- security
# Applied only outside DEBUG so local http development still works.
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    # Set by the reverse proxy that terminates TLS.
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS', default=[])

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {'console': {'class': 'logging.StreamHandler'}},
    'root': {'handlers': ['console'], 'level': 'INFO'},
}
