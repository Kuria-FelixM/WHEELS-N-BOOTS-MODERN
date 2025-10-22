from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Prefetch
from .models import Location, Apartment
from core.models import Tenant
from .serializers import LocationSerializer, ApartmentSerializer
from core.serializers import TenantSerializer
from datetime import date
from calendar import monthrange
from django.db.models import Sum,Q
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db.models import Sum, Q
from zoneinfo import ZoneInfo
from django.utils import timezone

from payments.models import Transaction

from datetime import timezone as datetime_timezone
from django.db.models.functions import Coalesce

class LocationListView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LocationSerializer

    def post(self, request, *args, **kwargs):
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(merchant=request.user)  # attach logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        queryset = Location.objects.filter(merchant=request.user).prefetch_related(
            Prefetch("apartments__tenants", queryset=Tenant.objects.all())
        )
        serializer = LocationSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

    
class ApartmentCreateView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ApartmentSerializer

    def get(self, request, *args, **kwargs):
        """
        Fetch all apartments for the authenticated merchant.
        Optionally filter by locationName using ?location=<id>.
        """
        location_id = request.query_params.get("location")
        
        if location_id:
            apartments = Apartment.objects.filter(locationName_id=location_id)
        else:
            # Fetch all apartments belonging to this merchant
            apartments = Apartment.objects.filter(locationName__merchant=request.user)
        
        serializer = ApartmentSerializer(apartments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create a new apartment under a given location.
        """
        serializer = ApartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class TenantView(APIView):
    """
    API endpoint for creating and retrieving tenants.
    POST: Create a new tenant.
    GET: Retrieve all tenants or filter by location/apartment.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = TenantSerializer    

    def get(self, request):
        """
        Retrieve tenants. Supports optional filters:
        - ?location=<locationName>
        - ?apartment=<apartmentName>
        """
        locationName = request.query_params.get("locationName")
        apartmentName = request.query_params.get("apartmentName")

        tenants = Tenant.objects.all()

        # Filter by apartment/location if provided
        if locationName:
            tenants = tenants.filter(apartment__locationName__locationName=locationName)
        if apartmentName:
            tenants = tenants.filter(apartment__apartmentName=apartmentName)

        serializer = TenantSerializer(tenants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new tenant.
        """
        serializer = TenantSerializer(data=request.data)

        if serializer.is_valid():
            tenant = serializer.save()
            return Response(
                TenantSerializer(tenant).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, tenant_id):
        """
        Update an existing tenant partially.
        """
        try:
            tenant = Tenant.objects.get(pk=tenant_id)
        except Tenant.DoesNotExist:
            return Response({"detail": "Tenant not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = TenantSerializer(tenant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, tenant_id):
        """
        Delete a tenant.
        """
        try:
            tenant = Tenant.objects.get(pk=tenant_id)
        except Tenant.DoesNotExist:
            return Response({"detail": "Tenant not found."}, status=status.HTTP_404_NOT_FOUND)

        tenant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class TenantReconciliationView(APIView):
    """
    Returns a 12-month rolling reconciliation summary for a tenant.
    """

    def get(self, request, tenant_id):
        try:
            tenant = Tenant.objects.select_related("apartmentId").get(pk=tenant_id)
        except Tenant.DoesNotExist:
            return Response({"detail": "Tenant not found."}, status=status.HTTP_404_NOT_FOUND)

        # --- Base Info ---
        apartment = tenant.apartmentId
        billing_fee = tenant.tenantBillingFee
        today = timezone.now().date()

        # --- Check joined_date ---
        if not tenant.joinedDate:
            return Response(
                {"detail": "Tenant joined_date not set. Cannot determine billing start."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Billing starts from joined_date
        billing_start = tenant.joinedDate

        # Get all completed payments since joined_date
        payments = Transaction.objects.filter(
            tenant=tenant,
            status="COMPLETED"
        ).filter(
            Q(transactionTime__date__gte=billing_start) |
            Q(transactionTime__isnull=True, createdAt__date__gte=billing_start)
        ).order_by(Coalesce('transactionTime', 'createdAt'))


        # Initialize summary & rolling balance
        summary = []
        balance = 0

        # Loop through each billing month (joined_date → current month)
        current_year = billing_start.year
        current_month = billing_start.month

        while (current_year < today.year) or (current_year == today.year and current_month <= today.month):
            # Define start & end of month
            month_start = date(current_year, current_month, 1)
            month_end = date(current_year, current_month, monthrange(current_year, current_month)[1])

            # Sum all payments made in this month
            monthly_paid = payments.filter(
                Q(transactionTime__date__gte=month_start, transactionTime__date__lte=month_end)
                | Q(transactionTime__isnull=True, createdAt__date__gte=month_start, createdAt__date__lte=month_end)
                ).aggregate(total_paid=Sum("amount"))["total_paid"] or 0


            # Apply monthly rent & payments to rolling balance
            balance -= billing_fee   # expected rent charge
            balance += monthly_paid  # actual payments received

            # Determine monthly status
            if balance < 0:
                status_label = "Pending"
            elif balance > 0:
                status_label = "Credit (Overpaid)"
            else:
                status_label = "Settled"

            # Append month summary
            summary.append({
                "month": month_start.strftime("%B %Y"),
                "expected_fee": float(billing_fee),
                "paid": float(monthly_paid),
                "balance_carried_forward": float(balance),
                "status": status_label,
            })

            # Move to next month
            if current_month == 12:
                current_month = 1
                current_year += 1
            else:
                current_month += 1

        # Prepare API response
        data = {
            "tenant": tenant.tenantName,
            "apartment": apartment.apartmentName,
            "joined_date": billing_start.strftime("%B %Y"),
            "monthly_summary": summary,
            "final_balance": float(balance),
            "final_status": (
                "Credit" if balance > 0
                else "Pending" if balance < 0
                else "Settled"
            ),
        }

        return Response(data, status=status.HTTP_200_OK)
    
class MonthlyReconciliationSummary(APIView):
    """
    Returns reconciliation summary for the current month
    for the logged-in merchant.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        merchant = request.user
        if not merchant.is_authenticated:
            return Response(
                {"detail": "Authentication required."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        kenya_tz = ZoneInfo("Africa/Nairobi")
        now_local = timezone.now().astimezone(kenya_tz)
        first_day_local = now_local.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end_of_today_local = now_local.replace(hour=23, minute=59, second=59, microsecond=0)

        # Convert both to UTC for DB filtering
        start_utc = first_day_local.astimezone(datetime_timezone.utc)
        end_utc = end_of_today_local.astimezone(datetime_timezone.utc)

        tenants = Tenant.objects.filter(apartmentId__locationName__merchant=merchant)
        total_clients = tenants.count()
        total_billed = tenants.aggregate(total=Sum("tenantBillingFee"))["total"] or 0

        # ✅ Include both normal and manual transactions
        transactions = Transaction.objects.filter(
            Q(merchant=merchant) | Q(tenant__in=tenants),
            status="COMPLETED"
        ).filter(
            Q(transactionTime__gte=start_utc, transactionTime__lte=end_utc)
            | Q(transactionTime__isnull=True, createdAt__gte=start_utc, createdAt__lte=end_utc)
        )

        amount_paid = transactions.aggregate(total=Sum("amount"))["total"] or 0
        paid_clients = transactions.values("tenant").distinct().count()
        unpaid_clients = total_clients - paid_clients
        amount_unpaid = total_billed - amount_paid

        summary = {
            "month": first_day_local.strftime("%Y-%m-%d"),
            "total_billed": float(total_billed),
            "amount_paid": float(amount_paid),
            "amount_unpaid": float(amount_unpaid),
            "paid_clients": paid_clients,
            "unpaid_clients": unpaid_clients,
        }

        return Response(summary, status=status.HTTP_200_OK)
