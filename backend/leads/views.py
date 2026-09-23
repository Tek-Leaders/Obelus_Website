import logging

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .emails import send_submission_emails
from .models import Submission
from .serializers import (
    ContactSerializer,
    DemoSerializer,
    LeadSerializer,
    SubscribeSerializer,
)

logger = logging.getLogger(__name__)


class SubmissionThrottle(AnonRateThrottle):
    """These endpoints are public and unauthenticated, so they are rate
    limited per IP. The scope's rate is set in settings."""

    scope = 'submissions'


class BaseSubmissionView(CreateAPIView):
    permission_classes = [AllowAny]
    throttle_classes = [SubmissionThrottle]
    kind = None

    def get_client_ip(self):
        # X-Forwarded-For is set by the reverse proxy; the first entry is the
        # client. Trust it only because nginx/the platform rewrites it - a
        # direct-to-gunicorn deployment must not.
        forwarded = self.request.META.get('HTTP_X_FORWARDED_FOR', '')
        if forwarded:
            return forwarded.split(',')[0].strip()
        return self.request.META.get('REMOTE_ADDR')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        submission = serializer.save(
            kind=self.kind,
            ip_address=self.get_client_ip(),
            user_agent=request.META.get('HTTP_USER_AGENT', '')[:300],
        )

        # The row is committed before any mail is attempted, and a mail
        # failure is logged rather than raised: the visitor should not see an
        # error for a submission we already hold. `send_pending_notifications`
        # retries whatever is left with notified_at unset.
        try:
            send_submission_emails(submission)
        except Exception:
            logger.exception('notification failed for submission %s', submission.pk)

        return Response({'ok': True}, status=status.HTTP_201_CREATED)


class ContactView(BaseSubmissionView):
    serializer_class = ContactSerializer
    kind = Submission.Kind.CONTACT


class DemoView(BaseSubmissionView):
    serializer_class = DemoSerializer
    kind = Submission.Kind.DEMO


class LeadView(BaseSubmissionView):
    serializer_class = LeadSerializer
    kind = Submission.Kind.LEAD


class SubscribeView(BaseSubmissionView):
    serializer_class = SubscribeSerializer
    kind = Submission.Kind.SUBSCRIBE
