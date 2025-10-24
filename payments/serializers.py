from rest_framework import serializers
from .models import Transaction
from datetime import datetime

class TransactionSerializer(serializers.ModelSerializer):
    """
    Serializer that accepts both direct camelCase payloads and
    M-Pesa-style fields (TransID, MSISDN, BillRefNumber, etc.).
    """

    # --- M-Pesa-style aliases (mapped to model fields) ---
    TransID = serializers.CharField(source="transactionId", required=False)
    TransAmount = serializers.DecimalField(source="amount", max_digits=12, decimal_places=2, required=False)
    TransactionType = serializers.CharField(source="transactionType", required=False)
    MSISDN = serializers.CharField(source="phoneNumber", required=False)
    BillRefNumber = serializers.CharField(source="accountReference", allow_blank=True, required=False)
    KYCInfo = serializers.CharField(source="kycInfo", allow_blank=True, required=False)
    BusinessShortCode = serializers.CharField(source="businessShortcode", allow_blank=True, required=False)
    InvoiceNumber = serializers.CharField(source="invoiceNumber", allow_blank=True, required=False)
    OrgAccountBalance = serializers.DecimalField(
        source="orgAccountBalance", max_digits=12, decimal_places=2,
        required=False, allow_null=True
    )
    ThirdPartyTransID = serializers.CharField(source="thirdPartyTransId", allow_blank=True, required=False)
    callbackUrl = serializers.URLField(allow_blank=True, required=False)
    TransTime = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Transaction
        exclude = ["merchant"]  # merchant will be assigned in the view

    def create(self, validated_data):
        """
        Handles flexible input formats (TransTime, TransID, etc.)
        and ensures that required fields are correctly mapped.
        """
        trans_time_str = validated_data.pop("TransTime", None)
        if trans_time_str:
            try:
                # Handle both 20241008152530 and already ISO-like strings
                if len(trans_time_str) == 14 and trans_time_str.isdigit():
                    parsed_dt = datetime.strptime(trans_time_str, "%Y%m%d%H%M%S")
                else:
                    # Try to parse common ISO formats
                    parsed_dt = datetime.fromisoformat(trans_time_str.replace("Z", "+00:00"))
                validated_data["transactionTime"] = parsed_dt
            except Exception:
                validated_data["transactionTime"] = None

        # Ensure transactionId and amount are populated
        if not validated_data.get("transactionId"):
            validated_data["transactionId"] = (
                self.initial_data.get("TransID")
                or self.initial_data.get("transactionId")
            )

        if not validated_data.get("amount"):
            validated_data["amount"] = (
                self.initial_data.get("TransAmount")
                or self.initial_data.get("amount")
            )

        return super().create(validated_data)
