from django.urls import path
from .views import (
    LocationListView,
    ApartmentCreateView,
    TenantView,
    TenantReconciliationView,
    MonthlyReconciliationSummary,
)

urlpatterns = [
    path("locations/", LocationListView.as_view(), name="location_list"),
    path("apartments/", ApartmentCreateView.as_view(), name="create-apartment"),
    path("tenants/", TenantView.as_view(), name="tenant_list_create"),
    path('tenants/<int:tenant_id>/', TenantView.as_view(), name='tenant-detail'),
    path("tenants/<int:tenant_id>/reconcile/", TenantReconciliationView.as_view(), name="tenant-reconciliation"),
    path('merchant/summary/', MonthlyReconciliationSummary.as_view(), name='merchant-reconciliation-summary'), 
]