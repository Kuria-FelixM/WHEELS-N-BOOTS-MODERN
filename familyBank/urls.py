from django.urls import path
from .views import PaymentNotificationView

urlpatterns = [
    path("payments/familybank/", PaymentNotificationView.as_view(), name="payment-notification"),
]
