from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """
    Check that the configured mail settings actually deliver.

    Sends one message to LEADS_NOTIFY_TO (or --to) and reports what it used,
    so a failure points at the setting that is wrong rather than at Django.
    """

    help = 'Send a test email using the current EMAIL_* settings.'

    def add_arguments(self, parser):
        parser.add_argument('--to', help='Override the recipient.')

    def handle(self, *args, **options):
        to = [options['to']] if options['to'] else list(settings.LEADS_NOTIFY_TO)

        self.stdout.write('Using:')
        self.stdout.write(f'  backend   {settings.EMAIL_BACKEND}')
        self.stdout.write(f'  host      {settings.EMAIL_HOST or "(not set)"}:{settings.EMAIL_PORT} TLS={settings.EMAIL_USE_TLS}')
        self.stdout.write(f'  user      {settings.EMAIL_HOST_USER or "(not set)"}')
        self.stdout.write(f'  password  {"set" if settings.EMAIL_HOST_PASSWORD else "NOT SET"}')
        self.stdout.write(f'  from      {settings.DEFAULT_FROM_EMAIL}')
        self.stdout.write(f'  to        {", ".join(to)}')

        if 'console' in settings.EMAIL_BACKEND:
            self.stdout.write(self.style.WARNING(
                '\nEMAIL_BACKEND is the console backend: the message below is printed, '
                'not sent. Set EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend '
                'in .env to deliver for real.'
            ))

        # Flush before sending: the settings block goes to stdout and a
        # failure to stderr, and unflushed buffers print them out of order.
        self.stdout.flush()

        message = EmailMultiAlternatives(
            subject='[OBELUS] Test email',
            body=(
                'This is a test from the OBELUS website backend.\n\n'
                'If you are reading this in a real inbox, form notifications will '
                'arrive the same way.\n'
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=to,
        )

        try:
            # A fresh connection so a mistyped host fails here, plainly.
            message.connection = get_connection(fail_silently=False)
            sent = message.send()
        except Exception as exc:
            self.stderr.write(self.style.ERROR(f'\nFAILED: {type(exc).__name__}: {exc}'))
            self.stderr.write(
                '\nCommon causes:\n'
                '  535 / auth failed  - use an app password, not the mailbox password\n'
                '  timeout            - wrong host or port, or the network blocks 587\n'
                '  553 / 5.7.x        - DEFAULT_FROM_EMAIL is not an address this\n'
                '                       account is allowed to send as\n'
            )
            raise SystemExit(1)

        self.stdout.write(self.style.SUCCESS(f'\nSent {sent} message(s).'))
