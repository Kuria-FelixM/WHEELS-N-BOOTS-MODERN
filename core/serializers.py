from rest_framework import serializers
from .models import Merchant, MerchantPaymentChannel, Tenant, ScheduledSMSMessage, AutomatedMessageSettings


class MerchantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchant
        fields = ["id", "merchant_name", "email", "created_at"]
        read_only_fields = ["id", "created_at"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Merchant
        fields = ["id", "merchant_name", "email", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        merchant = Merchant.objects.create_user(**validated_data, password=password)
        return merchant


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class MerchantPaymentChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MerchantPaymentChannel
        fields = ["id", "channel_type", "shortcode", "account_number", "created_at"]
        read_only_fields = ["id", "created_at"]




class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = [
            "apartmentId",
            "tenantId",
            "houseNo",
            "tenantName",
            "tenantPhoneNumber",
            "tenantEmail",
            "tenantBillingFee",
            "joinedDate",     
            "created_at",
        ]
        read_only_fields = ["joinedDate", "created_at"]


class ScheduledSMSMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledSMSMessage
        fields = [
            'id',
            'tenant_ids',
            'message',
            'scheduled_time',
            'status',
            'created_at',
            'updated_at',
            'sent_at',
            'error_message',
        ]
        read_only_fields = ['created_at', 'updated_at', 'sent_at']


class AutomatedMessageSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutomatedMessageSettings
        fields = [
            'id',
            'monthly_reminder_day',
            'dunning_interval_days',
            'max_dunning_attempts',
            'business_name',
            'auto_thank_you_enabled',
            'auto_reminder_enabled',
            'dunning_enabled',
            'monthly_reminder_template',
            'thank_you_template',
            'payment_request_template',
            'final_notice_template',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

