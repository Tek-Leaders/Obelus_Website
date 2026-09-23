<#
    Apply database migrations using the project's virtualenv.

    Running plain `python manage.py migrate` picks up the global interpreter,
    which has neither django-environ nor the pinned Django version, so this
    wrapper always calls .venv's python.

        .\scripts\migrate.ps1            # apply migrations
        .\scripts\migrate.ps1 -Make      # make them first, then apply
        .\scripts\migrate.ps1 -Check     # fail if a model change has no migration
#>
param(
    [switch]$Make,
    [switch]$Check
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$python = Join-Path $root '.venv\Scripts\python.exe'

if (-not (Test-Path $python)) {
    Write-Error "Virtualenv not found at $python. Create it with: python -m venv .venv"
}

Push-Location $root
try {
    if ($Check) {
        # --check exits non-zero when a model change has no migration yet, so
        # CI or a deploy can stop before the schema drifts from the code.
        & $python manage.py makemigrations --check --dry-run
        Write-Host 'No missing migrations.' -ForegroundColor Green
        return
    }

    if ($Make) {
        & $python manage.py makemigrations
    }

    & $python manage.py migrate
    & $python manage.py showmigrations leads
}
finally {
    Pop-Location
}
