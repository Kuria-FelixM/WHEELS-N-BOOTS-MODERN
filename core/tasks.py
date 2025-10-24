from django.utils import timezone
from django.db.models import Q
from datetime import datetime, timedelta
from .models import Tenant, ScheduledSMSMessage, AutomatedMessageSettings
from payments.models import Transaction
import requests
import logging

logger = logging.getLogger(__name__)

class AutomatedSMSManager:
    """Manages automated SMS sending based on payment status and schedules"""
    
    def __init__(self, merchant):
        self.merchant = merchant
        self.settings = self.get_settings()
    
    def get_settings(self):
        """Get automated message settings from database or use defaults"""
        try:
            db_settings = AutomatedMessageSettings.objects.get(merchant=self.merchant)
            return {
                'monthly_reminder_day': db_settings.monthly_reminder_day,
                'dunning_interval_days': db_settings.dunning_interval_days,
                'max_dunning_attempts': db_settings.max_dunning_attempts,
                'business_name': db_settings.business_name,
                'auto_thank_you': db_settings.auto_thank_you_enabled,
                'auto_reminder': db_settings.auto_reminder_enabled,
                'dunning_enabled': db_settings.dunning_enabled,
                'templates': {
                    'monthly_reminder': db_settings.monthly_reminder_template,
                    'thank_you': db_settings.thank_you_template,
                    'payment_request': db_settings.payment_request_template,
                    'final_notice': db_settings.final_notice_template,
                }
            }
        except AutomatedMessageSettings.DoesNotExist:
            # Create default settings if they don't exist
            db_settings = AutomatedMessageSettings.objects.create(merchant=self.merchant)
            return {
                'monthly_reminder_day': db_settings.monthly_reminder_day,
                'dunning_interval_days': db_settings.dunning_interval_days,
                'max_dunning_attempts': db_settings.max_dunning_attempts,
                'business_name': db_settings.business_name,
                'auto_thank_you': db_settings.auto_thank_you_enabled,
                'auto_reminder': db_settings.auto_reminder_enabled,
                'dunning_enabled': db_settings.dunning_enabled,
                'templates': {
                    'monthly_reminder': db_settings.monthly_reminder_template,
                    'thank_you': db_settings.thank_you_template,
                    'payment_request': db_settings.payment_request_template,
                    'final_notice': db_settings.final_notice_template,
                }
            }
    
    def send_monthly_reminders(self):
        """Send monthly payment reminders on specified day"""
        today = timezone.now()
        
        # Check if today is the reminder day
        if today.day != self.settings['monthly_reminder_day']:
            return
        
        # Get all tenants who haven't paid this month
        current_month = today.month
        current_year = today.year
        
        # Get tenants who haven't paid this month
        paid_tenant_ids = Transaction.objects.filter(
            tenant__isnull=False,
            status='COMPLETED',
            transactionTime__year=current_year,
            transactionTime__month=current_month
        ).values_list('tenant_id', flat=True)
        
        unpaid_tenants = Tenant.objects.exclude(
            tenantId__in=paid_tenant_ids
        ).filter(
            apartmentId__merchant=self.merchant
        )
        
        for tenant in unpaid_tenants:
            message = self.settings['templates']['monthly_reminder'].format(
                name=tenant.tenantName,
                amount=f"{tenant.tenantBillingFee:,.2f}",
                business_name=self.settings['business_name']
            )
            
            # Create scheduled message for immediate sending
            ScheduledSMSMessage.objects.create(
                merchant=self.merchant,
                tenant_ids=[tenant.tenantId],
                message=message,
                scheduled_time=timezone.now(),
                status='pending'
            )
            
        logger.info(f"Created {unpaid_tenants.count()} monthly reminder messages")
        return unpaid_tenants.count()
    
    def send_payment_thank_you(self, transaction):
        """Automatically send thank you message when payment is received"""
        if not self.settings['auto_thank_you']:
            return
        
        if not transaction.tenant:
            return
        
        tenant = transaction.tenant
        message = self.settings['templates']['thank_you'].format(
            name=tenant.tenantName,
            amount=f"{transaction.amount:,.2f}",
            business_name=self.settings['business_name']
        )
        
        # Create scheduled message for immediate sending
        ScheduledSMSMessage.objects.create(
            merchant=self.merchant,
            tenant_ids=[tenant.tenantId],
            message=message,
            scheduled_time=timezone.now(),
            status='pending'
        )
        
        logger.info(f"Created thank you message for tenant {tenant.tenantName}")
        return True
    
    def send_payment_requests(self):
        """Send payment requests to overdue tenants"""
        if not self.settings['dunning_enabled']:
            return
        
        today = timezone.now()
        dunning_start_date = today - timedelta(days=self.settings['dunning_interval_days'])
        
        # Get tenants who haven't paid and it's been X days since reminder
        current_month = today.month
        current_year = today.year
        
        paid_tenant_ids = Transaction.objects.filter(
            tenant__isnull=False,
            status='COMPLETED',
            transactionTime__year=current_year,
            transactionTime__month=current_month
        ).values_list('tenant_id', flat=True)
        
        # Check if we're past the reminder day + dunning interval
        if today.day >= (self.settings['monthly_reminder_day'] + self.settings['dunning_interval_days']):
            overdue_tenants = Tenant.objects.exclude(
                tenantId__in=paid_tenant_ids
            ).filter(
                apartmentId__merchant=self.merchant
            )
            
            for tenant in overdue_tenants:
                # Check if we've already sent too many dunning messages this month
                existing_dunning = ScheduledSMSMessage.objects.filter(
                    merchant=self.merchant,
                    tenant_ids__contains=[tenant.tenantId],
                    message__contains='payment reminder',
                    created_at__year=current_year,
                    created_at__month=current_month
                ).count()
                
                if existing_dunning < self.settings['max_dunning_attempts']:
                    message = self.settings['templates']['payment_request'].format(
                        name=tenant.tenantName,
                        amount=f"{tenant.tenantBillingFee:,.2f}",
                        business_name=self.settings['business_name']
                    )
                    
                    ScheduledSMSMessage.objects.create(
                        merchant=self.merchant,
                        tenant_ids=[tenant.tenantId],
                        message=message,
                        scheduled_time=timezone.now(),
                        status='pending'
                    )
            
            logger.info(f"Created {overdue_tenants.count()} payment request messages")
            return overdue_tenants.count()
        
        return 0
    
    def send_final_notices(self):
        """Send final notices for severely overdue accounts"""
        today = timezone.now()
        current_month = today.month
        current_year = today.year
        
        # Send final notice if it's been 21+ days since due date
        if today.day >= (self.settings['monthly_reminder_day'] + 21):
            paid_tenant_ids = Transaction.objects.filter(
                tenant__isnull=False,
                status='COMPLETED',
                transactionTime__year=current_year,
                transactionTime__month=current_month
            ).values_list('tenant_id', flat=True)
            
            severely_overdue = Tenant.objects.exclude(
                tenantId__in=paid_tenant_ids
            ).filter(
                apartmentId__merchant=self.merchant
            )
            
            for tenant in severely_overdue:
                # Check if final notice already sent this month
                existing_final = ScheduledSMSMessage.objects.filter(
                    merchant=self.merchant,
                    tenant_ids__contains=[tenant.tenantId],
                    message__contains='Final notice',
                    created_at__year=current_year,
                    created_at__month=current_month
                ).exists()
                
                if not existing_final:
                    message = self.settings['templates']['final_notice'].format(
                        name=tenant.tenantName,
                        amount=f"{tenant.tenantBillingFee:,.2f}",
                        business_name=self.settings['business_name']
                    )
                    
                    ScheduledSMSMessage.objects.create(
                        merchant=self.merchant,
                        tenant_ids=[tenant.tenantId],
                        message=message,
                        scheduled_time=timezone.now(),
                        status='pending'
                    )
            
            logger.info(f"Created {severely_overdue.count()} final notice messages")
            return severely_overdue.count()
        
        return 0


def check_and_send_automated_messages(merchant):
    """Main function to check and send all automated messages"""
    manager = AutomatedSMSManager(merchant)
    
    # Send monthly reminders
    manager.send_monthly_reminders()
    
    # Send payment requests (dunning)
    manager.send_payment_requests()
    
    # Send final notices
    manager.send_final_notices()
    
    # Process any pending scheduled messages
    process_scheduled_messages(merchant)


def process_scheduled_messages(merchant):
    """Process and send pending scheduled messages"""
    pending_messages = ScheduledSMSMessage.objects.filter(
        merchant=merchant,
        status='pending',
        scheduled_time__lte=timezone.now()
    )
    
    for message in pending_messages:
        try:
            # Get tenant phone numbers
            tenants = Tenant.objects.filter(tenantId__in=message.tenant_ids)
            
            for tenant in tenants:
                # Send SMS via API
                send_sms(tenant.tenantPhoneNumber[0] if isinstance(tenant.tenantPhoneNumber, list) else tenant.tenantPhoneNumber, message.message)
            
            message.status = 'sent'
            message.sent_at = timezone.now()
            message.save()
            
            logger.info(f"Sent scheduled message {message.id} to {len(tenants)} recipients")
            
        except Exception as e:
            message.status = 'failed'
            message.error_message = str(e)
            message.save()
            logger.error(f"Failed to send scheduled message {message.id}: {e}")


def send_sms(phone_number, message):
    """Send SMS via PesaFlux API"""
    api_url = "https://sms.pesaflux.co.ke/api/v1/send"
    api_key = "db30c2a4912fb8c2a7e3fe6037e19dc0"
    sender_id = "fluxsms"
    
    payload = {
        "api_key": api_key,
        "phone": phone_number,
        "message": message,
        "sender_id": sender_id
    }
    
    response = requests.post(api_url, json=payload)
    response.raise_for_status()
    return response.json()
