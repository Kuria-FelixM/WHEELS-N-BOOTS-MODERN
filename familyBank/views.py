from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from payments.serializers import TransactionSerializer
from payments.models import Transaction
from core.models import MerchantPaymentChannel, Tenant


class PaymentNotificationView(APIView):
    """
    Handles:
    - POST: Receive payment notifications (M-Pesa or Family Bank)
    - GET:  List all transactions
    """
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        """Return all saved transactions."""
        transactions = Transaction.objects.all().order_by("-createdAt")
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Process incoming payment notification."""
        raw_data = request.data

        # 🔹 Map incoming fields to your camelCase model
        mapped_data = {
            "transactionId": raw_data.get("TransID") or raw_data.get("transactionId"),
            "transactionType": raw_data.get("TransactionType") or "PAYBILL",
            "amount": raw_data.get("TransAmount") or raw_data.get("amount"),
            "phoneNumber": raw_data.get("MSISDN") or raw_data.get("phoneNumber"),
            "accountReference": raw_data.get("BillRefNumber") or raw_data.get("accountReference"),
            "kycInfo": raw_data.get("KYCInfo") or raw_data.get("kycInfo", ""),
            "businessShortcode": raw_data.get("BusinessShortCode") or raw_data.get("businessShortcode", ""),
            "orgAccountBalance": raw_data.get("OrgAccountBalance") or 0,
            "thirdPartyTransId": raw_data.get("ThirdPartyTransID") or raw_data.get("thirdPartyTransId"),
            "invoiceNumber": raw_data.get("InvoiceNumber") or raw_data.get("invoiceNumber", ""),
            "transactionDesc": raw_data.get("transactionDesc") or "",
            "TransTime": raw_data.get("TransTime") or raw_data.get("transactionTime"),

        }

        serializer = TransactionSerializer(data=mapped_data, context={"request": request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        txn_id = serializer.validated_data["transactionId"]

        # 🔹 Prevent duplicates
        if Transaction.objects.filter(transactionId=txn_id).exists():
            return Response(
                {
                    "status_code": "PAYMENT_ACK",
                    "status_description": "Duplicate transaction ignored",
                    "payment_ref": txn_id,
                },
                status=status.HTTP_200_OK,
            )

        # 🔹 Find merchant via BillRefNumber
        bill_ref_number = serializer.validated_data.get("accountReference")
        merchant_channel = MerchantPaymentChannel.objects.filter(account_number=bill_ref_number).first()
        if not merchant_channel:
            return Response({"error": f"Invalid BillRefNumber: {bill_ref_number}"}, status=status.HTTP_400_BAD_REQUEST)

        merchant = merchant_channel.merchant

        # 🔹 Find tenant by phone number (SQLite-safe)
        phone_number = serializer.validated_data.get("phoneNumber")
        tenant = next(
            (t for t in Tenant.objects.all() if phone_number in t.tenantPhoneNumber),
            None
        )

        # 🔹 Save transaction
        transaction = serializer.save(
            status="COMPLETED",
            merchant=merchant,
            tenant=tenant if tenant else None,
        )

        # ✅ Return unified ACK
        return Response(
            {
                "status_code": "PAYMENT_ACK",
                "status_description": "Payment Transaction Received Successfully",
                "payment_ref": str(transaction.id),
                "date_time": transaction.transactionTime.strftime("%Y-%m-%d %H:%M:%S")
                if transaction.transactionTime else "",
            },
            status=status.HTTP_200_OK,
        )
