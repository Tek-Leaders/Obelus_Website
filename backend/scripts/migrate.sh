#!/usr/bin/env bash
# Apply database migrations using the project's virtualenv.
#
# The Linux counterpart of migrate.ps1.
#
#   ./scripts/migrate.sh            apply pending migrations
#   ./scripts/migrate.sh --make     generate them from model changes, then apply
#   ./scripts/migrate.sh --check    exit non-zero if a model change has no migration
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
python="$root/.venv/bin/python"

if [ ! -x "$python" ]; then
  echo "Virtualenv not found at $python" >&2
  echo "Create it with: python3 -m venv .venv && .venv/bin/pip install -r requirements.txt" >&2
  exit 1
fi

cd "$root"

case "${1:-}" in
  --check)
    # Non-zero exit when a model changed without its migration, so a deploy
    # stops before the schema drifts from the code.
    "$python" manage.py makemigrations --check --dry-run
    echo "No missing migrations."
    ;;
  --make)
    "$python" manage.py makemigrations
    "$python" manage.py migrate
    "$python" manage.py showmigrations leads
    ;;
  *)
    "$python" manage.py migrate
    "$python" manage.py showmigrations leads
    ;;
esac
