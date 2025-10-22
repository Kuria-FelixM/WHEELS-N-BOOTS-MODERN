from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import Merchant
from core.tasks import check_and_send_automated_messages
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Check and send automated SMS messages based on payment status and schedules'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--merchant-id',
            type=int,
            help='Specific merchant ID to process',
        )
    
    def handle(self, *args, **options):
        self.stdout.write('Starting automated SMS processing...')
        
        # Get merchants to process
        if options['merchant_id']:
            merchants = Merchant.objects.filter(id=options['merchant_id'])
        else:
            merchants = Merchant.objects.filter(is_active=True)
        
        total_sent = 0
        
        for merchant in merchants:
            self.stdout.write(f'Processing merchant: {merchant.merchant_name}')
            
            try:
                check_and_send_automated_messages(merchant)
                self.stdout.write(self.style.SUCCESS(f'✓ Processed merchant {merchant.merchant_name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'✗ Error processing merchant {merchant.merchant_name}: {e}'))
                logger.error(f'Error processing merchant {merchant.id}: {e}')
        
        self.stdout.write(self.style.SUCCESS(f'Automated SMS processing complete'))
