"""
Regenerate scripts/schema.sql from Django's migrations.

The SQL export is a convenience for DBAs and for provisioning a server
without Django; models.py plus the migrations remain the source of truth.
Run from the backend/ directory after changing a model and making its
migration:

    .venv/Scripts/python.exe scripts/export_schema.py
"""

import pathlib
import subprocess
import sys

BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
OUT = BASE_DIR / 'scripts' / 'schema.sql'

HEADER = """-- ---------------------------------------------------------------------------
-- OBELUS backend: full schema, exported from Django's migrations.
--
-- THIS FILE IS A REFERENCE, NOT THE SOURCE OF TRUTH. The schema is defined by
-- leads/models.py and applied with:
--
--     python manage.py migrate
--
-- Use this export when a DBA needs to review the schema, or to provision a
-- server where running Django is not an option. If you apply it by hand you
-- must also mark the migrations as applied, or Django will try to create the
-- tables again:
--
--     python manage.py migrate --fake
--
-- Regenerate after changing any model:
--
--     python scripts/export_schema.py
-- ---------------------------------------------------------------------------

"""


def migrations():
    """Every applied migration, in the order Django applied them."""
    result = subprocess.run(
        [sys.executable, 'manage.py', 'showmigrations', '--plan'],
        cwd=BASE_DIR, capture_output=True, text=True, check=True,
    )
    for line in result.stdout.splitlines():
        line = line.strip()
        if not line.startswith('['):
            continue
        # "[X]  app.0001_initial"
        label = line.split(']', 1)[1].strip().split(' ')[0]
        if '.' in label:
            yield label.split('.', 1)


def main():
    chunks = [HEADER]
    for app, name in migrations():
        result = subprocess.run(
            [sys.executable, 'manage.py', 'sqlmigrate', app, name],
            cwd=BASE_DIR, capture_output=True, text=True,
        )
        if result.returncode == 0 and result.stdout.strip():
            chunks.append(f'-- ===== {app}.{name} =====\n{result.stdout.strip()}\n')

    OUT.write_text('\n'.join(chunks), encoding='utf-8')
    tables = '\n'.join(chunks).count('CREATE TABLE')
    print(f'wrote {OUT.relative_to(BASE_DIR)} ({tables} tables)')


if __name__ == '__main__':
    main()
