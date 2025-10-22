from django.contrib import admin
from .models import Merchant, MerchantPaymentChannel, Tenant, ScheduledSMSMessage, AutomatedMessageSettings

# Register your models here.

@admin.register(Merchant)
class MerchantAdmin(admin.ModelAdmin):
    list_display = ['id', 'merchant_name', 'email', 'is_active', 'created_at']
    search_fields = ['merchant_name', 'email']
    list_filter = ['is_active', 'created_at']

@admin.register(MerchantPaymentChannel)
class MerchantPaymentChannelAdmin(admin.ModelAdmin):
    list_display = ['id', 'merchant', 'channel_type', 'shortcode', 'created_at']
    search_fields = ['merchant__merchant_name', 'shortcode']
    list_filter = ['channel_type']

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ['tenantId', 'tenantName', 'houseNo', 'tenantBillingFee', 'apartmentId', 'created_at']
    search_fields = ['tenantName', 'houseNo']
    list_filter = ['created_at']

@admin.register(ScheduledSMSMessage)
class ScheduledSMSMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'merchant', 'get_recipient_count', 'scheduled_time', 'status', 'created_at']
    list_filter = ['status', 'scheduled_time', 'created_at']
    search_fields = ['merchant__merchant_name', 'message']
    readonly_fields = ['created_at', 'updated_at', 'sent_at']
    
    def get_recipient_count(self, obj):
        return len(obj.tenant_ids)
    get_recipient_count.short_description = 'Recipients'
    
    fieldsets = (
        ('Message Details', {
            'fields': ('merchant', 'message', 'tenant_ids')
        }),
        ('Scheduling', {
            'fields': ('scheduled_time', 'status')
        }),
        ('Tracking', {
            'fields': ('created_at', 'updated_at', 'sent_at', 'error_message')
        }),
    )

@admin.register(AutomatedMessageSettings)
class AutomatedMessageSettingsAdmin(admin.ModelAdmin):
    list_display = ['merchant', 'monthly_reminder_day', 'dunning_interval_days', 'auto_thank_you_enabled', 'auto_reminder_enabled', 'updated_at']
    search_fields = ['merchant__merchant_name']
    list_filter = ['auto_thank_you_enabled', 'auto_reminder_enabled', 'dunning_enabled']
    
    fieldsets = (
        ('Merchant', {
            'fields': ('merchant',)
        }),
        ('Timing Settings', {
            'fields': ('monthly_reminder_day', 'dunning_interval_days', 'max_dunning_attempts')
        }),
        ('Business Info', {
            'fields': ('business_name',)
        }),
        ('Feature Toggles', {
            'fields': ('auto_thank_you_enabled', 'auto_reminder_enabled', 'dunning_enabled')
        }),
        ('Message Templates', {
            'fields': ('monthly_reminder_template', 'thank_you_template', 'payment_request_template', 'final_notice_template'),
            'classes': ('collapse',)
        }),
    )
