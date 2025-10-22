from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings
from dashboard.models import Apartment


class MerchantManager(BaseUserManager):
    def create_user(self, email, merchant_name, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, merchant_name=merchant_name, **extra_fields)
        user.set_password(password)  # hash password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, merchant_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, merchant_name, password, **extra_fields)


class Merchant(AbstractBaseUser, PermissionsMixin):
    # ✅ Django will automatically create `id` as primary key
    merchant_name = models.CharField(max_length=150, null=False)
    email         = models.EmailField(unique=True)
    phone_number  = models.CharField(max_length=20, unique=True, null=True, blank=True) 

    is_active     = models.BooleanField(default=True)
    is_staff      = models.BooleanField(default=False)

    created_at    = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD  = "email"
    REQUIRED_FIELDS = ["merchant_name, phone_number"]

    objects = MerchantManager()

    def __str__(self):
        return self.merchant_name
    



class MerchantPaymentChannel(models.Model):
    CHANNEL_CHOICES = [
        ("PAYBILL", "Paybill"),
        ("BUYGOODS", "BuyGoods"),
    ]

    merchant       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="payment_channels")
    channel_type   = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    shortcode      = models.CharField(max_length=20)
    account_number = models.CharField(max_length=50, blank=True, null=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.channel_type} - {self.shortcode}"
    


class Tenant(models.Model):
    tenantId = models.AutoField(primary_key=True)
    apartmentId = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name="tenants")
    houseNo = models.CharField(max_length=10)
    tenantName = models.CharField(max_length=100)
    tenantPhoneNumber = models.JSONField(default=list)
    tenantEmail = models.EmailField(blank=True, null=True)
    tenantBillingFee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    joinedDate = models.DateTimeField(auto_now_add=True)  # ✅ Includes both date and time
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tenantName} ({self.tenantBillingFee})"


class ScheduledSMSMessage(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('sent', 'Sent'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]
    
    merchant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="scheduled_messages")
    tenant_ids = models.JSONField(default=list)  # List of tenant IDs to send to
    message = models.TextField()
    scheduled_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['scheduled_time']
        indexes = [
            models.Index(fields=['merchant', 'status', 'scheduled_time']),
        ]
    
    def __str__(self):
        return f"SMS to {len(self.tenant_ids)} tenants at {self.scheduled_time}"


class AutomatedMessageSettings(models.Model):
    """Settings for automated messaging per merchant"""
    merchant = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="message_settings")
    
    # Timing settings
    monthly_reminder_day = models.IntegerField(default=10, help_text="Day of month to send reminders (1-28)")
    dunning_interval_days = models.IntegerField(default=7, help_text="Days between payment reminders")
    max_dunning_attempts = models.IntegerField(default=3, help_text="Maximum reminder attempts per month")
    
    # Business info
    business_name = models.CharField(max_length=200, default="Taka Money Services")
    
    # Feature toggles
    auto_thank_you_enabled = models.BooleanField(default=True, help_text="Send automatic thank you on payment")
    auto_reminder_enabled = models.BooleanField(default=True, help_text="Send automatic monthly reminders")
    dunning_enabled = models.BooleanField(default=True, help_text="Send payment request reminders")
    
    # Message templates
    monthly_reminder_template = models.TextField(
        default="Hello {name}, this is a reminder to pay your monthly garbage collection service fee of KES {amount}. Thank you, {business_name}",
        help_text="Use {name}, {amount}, {business_name} as variables"
    )
    thank_you_template = models.TextField(
        default="Thank you {name} for your payment of KES {amount}. We have received your monthly garbage collection service fee. {business_name}",
        help_text="Use {name}, {amount}, {business_name} as variables"
    )
    payment_request_template = models.TextField(
        default="This is a payment reminder for {name}. Your garbage collection service fee of KES {amount} is overdue. Please pay as soon as possible. {business_name}",
        help_text="Use {name}, {amount}, {business_name} as variables"
    )
    final_notice_template = models.TextField(
        default="Final notice: {name}, your garbage collection service fee of KES {amount} is severely overdue. Please settle immediately to avoid service interruption. {business_name}",
        help_text="Use {name}, {amount}, {business_name} as variables"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Settings for {self.merchant.merchant_name}"

    



