import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Tenant
from .serializers import TransactionSerializer


class ManualTransactionAPIView(APIView):
    """
    API endpoint for recording manual payments (cash, cheque, etc.)
    - Requires: phone_number, amount, payment_mode
    - Rejects if tenant not found by phone number
    """

    def post(self, request):
        data = request.data.copy()

        phone_number = data.get("phone_number")
        amount = data.get("amount")
        payment_mode = data.get("payment_mode", "CASH")
        description = data.get("description", "Manual payment")

        # --- Basic validation ---
        if not phone_number or not amount:
            return Response(
                {"error": "phone_number and amount are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # --- Find tenant ---
        tenants = Tenant.objects.all()
        tenant = next((t for t in tenants if phone_number in t.tenantPhoneNumber), None)

        if not tenant:
            return Response(
                {"error": f"No tenant found with phone number {phone_number}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


        # --- Prepare data for serializer ---
        data["transactionId"] = f"MANUAL-{uuid.uuid4().hex[:10]}"
        data["transactionType"] = payment_mode
        data["tenant"] = tenant.tenantId
        data["phoneNumber"] = phone_number
        data["transactionDesc"] = description
        data["is_manual"] = True
        data["status"] = "COMPLETED"

        # --- Serialize and Save ---
        serializer = TransactionSerializer(data=data)
        if serializer.is_valid():
            transaction = serializer.save(merchant=request.user)
            return Response(
                {
                    "message": "Manual payment recorded successfully",
                    "transaction_id": transaction.transactionId,
                    "tenant": tenant.tenantName,
                    "amount": str(transaction.amount),
                    "payment_mode": transaction.transactionType,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
