import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone

logger = logging.getLogger(__name__)

KIND_SUBJECTS = {
    'contact': 'Contact form',
    'demo': 'Demo request',
    'lead': 'Expert enquiry',
    'subscribe': 'Newsletter signup',
}


def _notification(submission):
    who = submission.full_name or submission.email
    company = f' - {submission.company}' if submission.company else ''
    subject = f'[OBELUS] {KIND_SUBJECTS.get(submission.kind, submission.kind)}: {who}{company}'

    # The From address is always our own domain. Putting the visitor's address
    # there would fail SPF/DMARC for their domain and get the mail dropped;
    # reply_to gives the same one-click reply without that.
    return EmailMultiAlternatives(
        subject=subject,
        body=render_to_string('leads/notification.txt', {'sub': submission}),
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=settings.LEADS_NOTIFY_TO,
        reply_to=[submission.email],
    )


def _acknowledgement(submission):
    return EmailMultiAlternatives(
        subject='Thanks for contacting OBELUS',
        body=render_to_string('leads/acknowledgement.txt', {'sub': submission}),
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[submission.email],
        reply_to=settings.LEADS_NOTIFY_TO,
    )


def send_submission_emails(submission):
    """
    Notify the team, then acknowledge to the visitor.

    Raises on failure so the caller can leave `notified_at` unset and let the
    retry command pick it up. The caller must have saved the submission
    first - a lead is never lost because mail was down.
    """
    _notification(submission).send(fail_silently=False)

    if settings.LEADS_SEND_ACKNOWLEDGEMENT and submission.kind != 'subscribe':
        try:
            _acknowledgement(submission).send(fail_silently=False)
        except Exception:
            # The team has the lead either way; don't retry the whole batch
            # just because the visitor's mail server bounced us.
            logger.exception('acknowledgement failed for submission %s', submission.pk)

    submission.notified_at = timezone.now()
    submission.save(update_fields=['notified_at'])
