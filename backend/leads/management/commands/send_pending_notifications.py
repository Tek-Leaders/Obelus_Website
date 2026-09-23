from django.core.management.base import BaseCommand

from leads.emails import send_submission_emails
from leads.models import Submission


class Command(BaseCommand):
    """
    Re-send notifications for submissions whose mail never went out.

    The API saves the row first and only then sends, so an SMTP outage leaves
    `notified_at` null rather than losing the lead. Run this on a schedule (or
    by hand after fixing mail) to flush the backlog.
    """

    help = 'Send notifications for submissions that have none yet.'

    def add_arguments(self, parser):
        parser.add_argument('--limit', type=int, default=50)

    def handle(self, *args, **options):
        pending = Submission.objects.filter(notified_at__isnull=True).order_by('created_at')
        pending = pending[: options['limit']]

        sent = failed = 0
        for submission in pending:
            try:
                send_submission_emails(submission)
                sent += 1
            except Exception as exc:  # noqa: BLE001 - reported, then move on
                failed += 1
                self.stderr.write(f'submission {submission.pk}: {exc}')

        self.stdout.write(self.style.SUCCESS(f'sent {sent}, failed {failed}'))
