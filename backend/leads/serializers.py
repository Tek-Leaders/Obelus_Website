from rest_framework import serializers

from .models import Submission

# Fields the React forms send that belong in `extra` rather than in their own
# column. Keys are the camelCase names the frontend uses.
EXTRA_FIELDS = (
    'jobLevel',
    'jobRole',
    'country',
    'state',
    'postalCode',
    'department',
)


class BaseSubmissionSerializer(serializers.ModelSerializer):
    """
    Shared shape for every form.

    The React forms send camelCase, so the field names here match them and are
    mapped onto the model's snake_case columns. `website` is a honeypot: it is
    hidden from real users, so anything that fills it in is a bot.
    """

    firstName = serializers.CharField(source='first_name', max_length=100, required=False, allow_blank=True)
    lastName = serializers.CharField(source='last_name', max_length=100, required=False, allow_blank=True)
    marketingOptIn = serializers.BooleanField(source='marketing_opt_in', required=False, default=False)
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Submission
        fields = (
            'firstName', 'lastName', 'email', 'company', 'phone', 'message',
            'marketingOptIn', 'website',
        )

    def validate_website(self, value):
        if value:
            # Deliberately vague: a bot should not learn which field it was.
            raise serializers.ValidationError('Invalid submission.')
        return value

    def to_internal_value(self, data):
        validated = super().to_internal_value(data)
        validated.pop('website', None)
        validated['extra'] = {
            key: str(data[key]).strip()
            for key in EXTRA_FIELDS
            if isinstance(data, dict) and data.get(key)
        }
        return validated


class ContactSerializer(BaseSubmissionSerializer):
    """Contact Us - matches the required fields in ContactForm.jsx."""

    firstName = serializers.CharField(source='first_name', max_length=100)
    lastName = serializers.CharField(source='last_name', max_length=100)
    message = serializers.CharField()


class DemoSerializer(BaseSubmissionSerializer):
    """Request a demo - matches REQUIRED in RDForm.jsx."""

    firstName = serializers.CharField(source='first_name', max_length=100)
    lastName = serializers.CharField(source='last_name', max_length=100)
    company = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=50)

    def validate(self, attrs):
        if not attrs.get('extra', {}).get('jobLevel'):
            raise serializers.ValidationError({'jobLevel': 'This field is required.'})
        return attrs


class LeadSerializer(DemoSerializer):
    """Speak to an expert - the demo fields plus a required country."""

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not attrs.get('extra', {}).get('country'):
            raise serializers.ValidationError({'country': 'This field is required.'})
        return attrs


class SubscribeSerializer(BaseSubmissionSerializer):
    """Footer newsletter - an email address and nothing else."""

    class Meta(BaseSubmissionSerializer.Meta):
        fields = ('email', 'marketingOptIn', 'website')
