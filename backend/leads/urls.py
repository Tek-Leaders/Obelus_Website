from django.urls import path

from .views import ContactView, DemoView, LeadView, SubscribeView

# One endpoint per form so each gets its own required-field rules.
urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact'),
    path('demo/', DemoView.as_view(), name='demo'),
    path('lead/', LeadView.as_view(), name='lead'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
]
