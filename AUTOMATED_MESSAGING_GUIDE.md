# Automated Messaging System - Complete Guide

## 🎯 Overview

The automated messaging system sends SMS to tenants based on their payment status:
- **Monthly Reminders** - Sent on day 10 to tenants who haven't paid
- **Payment Thank You** - Sent automatically when payment is received
- **Payment Requests** - Sent to overdue tenants after 7 days
- **Final Notices** - Sent to severely overdue accounts after 21 days

## 🏗️ Architecture

### Backend Components

1. **Database Models** (`core/models.py`)
   - `ScheduledSMSMessage` - Stores scheduled messages
   - Tracks status: pending, sent, failed, cancelled

2. **Automation Logic** (`core/tasks.py`)
   - `AutomatedSMSManager` - Main class for automated messaging
   - `check_and_send_automated_messages()` - Process all automated messages
   - `process_scheduled_messages()` - Send pending scheduled messages

3. **Signal Handlers** (`core/signals.py`)
   - Listens for `Transaction.save()` events
   - Automatically sends thank you when payment status = COMPLETED

4. **Management Command** (`core/management/commands/send_automated_sms.py`)
   - Run manually: `python manage.py send_automated_sms`
   - Can be scheduled with Windows Task Scheduler or cron

5. **API Endpoints** (`core/views.py` & `core/urls.py`)
   - `POST /api/automated-messages/trigger/` - Trigger all automated checks
   - `POST /api/scheduled-messages/process/` - Process pending messages
   - `GET /api/scheduled-sms/` - List scheduled messages
   - `POST /api/scheduled-sms/` - Create scheduled message
   - `PATCH /api/scheduled-sms/<id>/` - Update message status
   - `DELETE /api/scheduled-sms/<id>/` - Cancel message

### Frontend Components

1. **SMS Automated Page** (`components/sms-automated.tsx`)
   - Configure automated message settings
   - Enable/disable message types
   - Trigger messages manually with "Run Now" button
   - Edit message templates

2. **API Integration** (`lib/api.ts`)
   - `smsAPI.triggerAutomatedMessages()` - Trigger backend processing
   - `smsAPI.processScheduledMessages()` - Process pending messages
   - `smsAPI.createScheduledMessage()` - Schedule new message

## 🔄 How It Works

### 1. Monthly Reminders (Day 10)
```
- Check if today is day 10
- Find tenants who haven't paid this month
- Create scheduled messages for immediate sending
- Messages include tenant name and billing amount
```

### 2. Auto Thank You (When Payment Received)
```
- Django signal detects Transaction.status = "COMPLETED"
- Automatically creates thank you message
- Sends via PesaFlux API
- No manual intervention needed
```

### 3. Payment Requests (7 days after due)
```
- Check if it's been 7+ days since reminder
- Find tenants still unpaid
- Limit to max 3 dunning attempts per month
- Create scheduled payment request messages
```

### 4. Final Notices (21 days overdue)
```
- Check if it's been 21+ days
- Find severely overdue accounts
- Send final notice (one per month)
- Warn about service interruption
```

## 🚀 Setup & Deployment

### Initial Setup

1. **Database Migration**
   ```bash
   cd C:\Users\USED\Downloads\Taka-Money-main\Taka-Money-main
   python manage.py makemigrations
   python manage.py migrate
   ```

2. **Restart Django Server**
   ```bash
   python manage.py runserver
   ```

3. **Test Manual Trigger**
   - Go to SMS > Automated Messages
   - Click "Run Now" button
   - Check console for processing logs

### Automated Daily Processing

#### Option 1: Windows Task Scheduler (Recommended)

1. Create batch file: `C:\Users\USED\run_automated_sms.bat`
   ```batch
   @echo off
   cd C:\Users\USED\Downloads\Taka-Money-main\Taka-Money-main
   python manage.py send_automated_sms
   ```

2. Open Task Scheduler
   - Create Basic Task
   - Name: "Taka Money Automated SMS"
   - Trigger: Daily at 8:00 AM
   - Action: Start a program
   - Program: `C:\Users\USED\run_automated_sms.bat`

#### Option 2: Manual Trigger from UI

- Open Automated Messages page
- Click "Run Now" button
- Processes all pending automated messages

#### Option 3: Background Service (Advanced)

Install Celery for true background processing:
```bash
pip install celery redis
```

## 📊 Message Logic

### Monthly Reminder
- **Trigger**: Every 10th of month
- **Recipients**: Tenants with no payments this month
- **Template**: "Hello {name}, reminder to pay KES {amount}..."

### Payment Thank You
- **Trigger**: When Transaction.status changes to "COMPLETED"
- **Recipients**: The tenant who paid
- **Template**: "Thank you {name} for your payment of KES {amount}..."

### Payment Request
- **Trigger**: 7+ days after monthly reminder day
- **Recipients**: Tenants still unpaid
- **Limit**: Max 3 requests per month
- **Template**: "Payment reminder for {name}. KES {amount} is overdue..."

### Final Notice
- **Trigger**: 21+ days after due date
- **Recipients**: Severely overdue tenants
- **Limit**: One per month
- **Template**: "Final notice: KES {amount} severely overdue..."

## 🔧 Configuration

### Settings (in UI)
- **Monthly Reminder Day**: 1-28 (default: 10)
- **Dunning Interval**: Days between reminders (default: 7)
- **Max Dunning Attempts**: Maximum reminders (default: 3)
- **Business Name**: Your company name in messages
- **Auto Thank You**: On/Off
- **Auto Reminder**: On/Off
- **Dunning Enabled**: On/Off

### Customization (in code)

Edit `core/tasks.py` to customize:
- Message templates
- Timing intervals
- Logic for who gets messages
- Number of reminder attempts

## 📝 Testing

### Test Payment Thank You
1. Create a test transaction in Django admin
2. Set status to "COMPLETED"
3. Set tenant field
4. Save
5. Check scheduled messages - should see thank you message

### Test Monthly Reminders
1. Temporarily change reminder day to today in `AutomatedSMSManager`
2. Run: `python manage.py send_automated_sms`
3. Check scheduled messages
4. Verify messages created for unpaid tenants

### Test Manual Trigger
1. Go to SMS > Automated Messages
2. Click "Run Now"
3. Open browser console
4. Check for success toast notification
5. Verify in Django admin > Scheduled SMS Messages

## 🐛 Troubleshooting

### Messages Not Sending
- Check Django server is running
- Verify migrations are applied
- Check browser console for errors
- Verify PesaFlux API credentials in `core/tasks.py`

### Thank You Not Sending
- Verify signals are registered (check `core/apps.py`)
- Check Transaction has tenant assigned
- Look for errors in Django server logs
- Verify signal is firing (add logging)

### Scheduled Messages Stuck as "Pending"
- Run: `python manage.py send_automated_sms`
- Or click "Run Now" in UI
- Or ensure automated task is scheduled

## 📈 Monitoring

### Check Message Status
1. Django Admin > Core > Scheduled SMS Messages
2. Filter by status (pending/sent/failed)
3. View error messages for failed sends
4. Check sent_at timestamps

### View Logs
- Django server console shows processing logs
- Browser console shows frontend actions
- Check for "✅ Sent" or "❌ Error" messages

## 🔐 Security Notes

- API Key stored in `core/tasks.py` - move to environment variables for production
- Ensure authentication required for trigger endpoints
- Limit rate of message sending to avoid spam
- Monitor message costs with SMS provider

## 📞 Support

For issues:
1. Check this guide
2. Review Django server logs
3. Check browser console
4. Verify database has correct data
5. Test with smaller dataset first

---

**System Status**: ✅ Fully Functional
**Last Updated**: October 2025
