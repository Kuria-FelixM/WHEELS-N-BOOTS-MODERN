from django.db import models
from core.models import Merchant, Tenant


class Transaction(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    )

    TRANSACTION_TYPES = (
        ('BUY_GOODS', 'Buy Goods'),
        ('Pay Bill', 'Pay Bill',),
        ('DEPOSIT', 'Deposit'),  # for Family Bank direct notifications
        ('TRANSFER', 'Transfer'),
        ('CASH', 'Cash'),
        ('CHEQUE', 'Cheque'),
        ('EFT', 'EFT'),
        ('SWIFT', 'Swift'),
    )

    # Common link to Merchant / Tenant
    merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE, related_name='transactions', null=True, blank=True)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='transactions',  null=True, blank=True)

    #manual link to identify source
    is_manual = models.BooleanField(default=False)
    
    # Common identifiers
    transactionId = models.CharField(max_length=100, unique=True)  # TransID (Mpesa) or txn_reference (FBank)
    transactionType = models.CharField(max_length=20, choices=TRANSACTION_TYPES, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    # Party information
    phoneNumber = models.CharField(max_length=20, blank=True)   # MSISDN or payer_phone
    payerName = models.CharField(max_length=255, blank=True)    # For FBank
    customerId = models.CharField(max_length=100, blank=True)   # For FBank direct notifications

    # Reference fields
    accountReference = models.CharField(max_length=100, blank=True)   # BillRefNumber
    invoiceNumber = models.CharField(max_length=100, blank=True)      # InvoiceNumber
    collectionAccount = models.CharField(max_length=100, blank=True)  # FBank collection_account

    # Extra details
    transactionDesc = models.CharField(max_length=255, blank=True)    # Narration or Mpesa description
    businessShortcode = models.CharField(max_length=20, blank=True)   # BusinessShortCode
    orgAccountBalance = models.DecimalField(max_digits=12, decimal_places=2,
                                              null=True, blank=True)   # OrgAccountBalance
    thirdPartyTransId = models.CharField(max_length=100, null=True, blank=True)  # ThirdPartyTransID
    kycInfo = models.CharField(max_length=255, blank=True)            # Mpesa KYCInfo
    paymentMode = models.CharField(max_length=50, blank=True)         # For FBank (CASH, EFT, etc.)
    callbackUrl = models.URLField(blank=True)                         # Mpesa IPN callback

    # Time fields
    transactionTime = models.DateTimeField(null=True, blank=True)  # TransTime or date_time from FBank
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"{self.transactionId} - {self.amount} - {self.status}"

    class Meta:
        indexes = [
            models.Index(fields=['transactionId']),
            models.Index(fields=['merchant']),
        ]





