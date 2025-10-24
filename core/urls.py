from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, PaymentChannelView, 
    ScheduledSMSMessageView, AutomatedMessagingView, ProcessScheduledMessagesView,
    AutomatedMessageSettingsView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path("paymentchannels/", PaymentChannelView.as_view(), name="payment-channel-list-create"),
    path("scheduled-sms/", ScheduledSMSMessageView.as_view(), name="scheduled-sms-list-create"),
    path("scheduled-sms/<int:pk>/", ScheduledSMSMessageView.as_view(), name="scheduled-sms-detail"),
    path("automated-messages/trigger/", AutomatedMessagingView.as_view(), name="trigger-automated-messages"),
    path("scheduled-messages/process/", ProcessScheduledMessagesView.as_view(), name="process-scheduled-messages"),
    path("automated-messages/settings/", AutomatedMessageSettingsView.as_view(), name="automated-message-settings"),
]