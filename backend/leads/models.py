from django.db import models


class Submission(models.Model):
    """
    One row per form submission from the marketing site.

    All four forms land in this table rather than one table each: they share
    most of their fields and the team wants a single chronological inbox.
    Only `kind` and `email` are always present - the footer subscribe form
    sends nothing else - so every other column allows blank. What a given form
    *requires* is enforced by its serializer, not here.

    Fields that only one form collects (job level, country, postal code, ...)
    live in `extra` instead of adding mostly-empty columns to the table.
    """

    class Kind(models.TextChoices):
        CONTACT = 'contact', 'Contact us'
        DEMO = 'demo', 'Request a demo'
        LEAD = 'lead', 'Speak to an expert'
        SUBSCRIBE = 'subscribe', 'Newsletter'

    kind = models.CharField(max_length=20, choices=Kind.choices, db_index=True)

    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(db_index=True)
    company = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField(blank=True)

    # Form-specific answers: job_level, job_role, country, state,
    # postal_code, department.
    extra = models.JSONField(default=dict, blank=True)

    marketing_opt_in = models.BooleanField(default=False)

    # Kept for audit and abuse handling, not for tracking.
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    # Null means the notification has not gone out yet. The
    # `send_pending_notifications` command retries those, so an SMTP outage
    # delays a notification instead of losing it.
    notified_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ('-created_at',)
        indexes = [models.Index(fields=('kind', '-created_at'))]

    def __str__(self):
        return f'{self.get_kind_display()}: {self.full_name or self.email}'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'.strip()
