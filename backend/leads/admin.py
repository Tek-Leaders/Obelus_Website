import csv

from django.http import HttpResponse
from django.contrib import admin

from .models import Submission


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    """The team's lead inbox. Read-only: these are records of what a visitor
    sent, so nothing here should be editable after the fact."""

    list_display = ('created_at', 'kind', 'full_name', 'email', 'company', 'notified_at')
    list_filter = ('kind', 'marketing_opt_in', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'company', 'message')
    date_hierarchy = 'created_at'
    readonly_fields = tuple(f.name for f in Submission._meta.fields)
    actions = ('export_csv',)

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    @admin.action(description='Export selected submissions to CSV')
    def export_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="obelus-submissions.csv"'
        writer = csv.writer(response)
        writer.writerow([
            'Received', 'Type', 'First name', 'Last name', 'Email', 'Company',
            'Phone', 'Message', 'Details', 'Marketing opt-in',
        ])
        for s in queryset:
            writer.writerow([
                s.created_at.strftime('%Y-%m-%d %H:%M'), s.get_kind_display(),
                s.first_name, s.last_name, s.email, s.company, s.phone,
                s.message, '; '.join(f'{k}: {v}' for k, v in s.extra.items()),
                'yes' if s.marketing_opt_in else 'no',
            ])
        return response
