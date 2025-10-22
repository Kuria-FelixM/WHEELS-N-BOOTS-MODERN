from django.urls import path
from .views import (
    ManualTransactionAPIView,
)

urlpatterns = [
    path("payments/manualPayments/", ManualTransactionAPIView.as_view(), name="manual-payments"),
]