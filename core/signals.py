from django.db.models.signals import post_save
from django.dispatch import receiver
from payments.models import Transaction
from .tasks import AutomatedSMSManager
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Transaction)
def send_payment_thank_you(sender, instance, created, **kwargs):
    """
    Automatically send thank you SMS when a payment is completed
    """
    # Only process completed transactions
    if instance.status != 'COMPLETED':
        return
    
    # Only process if tenant exists
    if not instance.tenant:
        return
    
    # Get merchant from tenant's apartment
    merchant = instance.tenant.apartmentId.merchant
    
    # Send thank you message
    try:
        manager = AutomatedSMSManager(merchant)
        manager.send_payment_thank_you(instance)
        logger.info(f"Sent automated thank you for transaction {instance.transactionId}")
    except Exception as e:
        logger.error(f"Failed to send automated thank you for transaction {instance.transactionId}: {e}")
