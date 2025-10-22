from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.utils import timezone
import logging

from .models import Merchant, MerchantPaymentChannel, ScheduledSMSMessage, AutomatedMessageSettings
from .serializers import (
    RegisterSerializer, LoginSerializer, MerchantSerializer, 
    MerchantPaymentChannelSerializer, ScheduledSMSMessageSerializer, AutomatedMessageSettingsSerializer
)
from .tasks import check_and_send_automated_messages, process_scheduled_messages

logger = logging.getLogger(__name__)


class RegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            merchant = serializer.save()
            refresh = RefreshToken.for_user(merchant)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "merchant": MerchantSerializer(merchant).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if not user.is_active:
                return Response({"error": "Account is disabled"}, status=status.HTTP_403_FORBIDDEN)
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "merchant": MerchantSerializer(user).data
            }, status=status.HTTP_200_OK)

        logger.warning(f"Failed login attempt for email: {email}")
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]


    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PaymentChannelView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MerchantPaymentChannelSerializer

    # ✅ List all payment channels for logged-in merchant
    def get(self, request):
        channels = MerchantPaymentChannel.objects.filter(merchant=request.user)
        serializer = MerchantPaymentChannelSerializer(channels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ✅ Create a new payment channel for logged-in merchant
    def post(self, request):
        serializer = MerchantPaymentChannelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(merchant=request.user)  # enforce logged-in merchant
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ScheduledSMSMessageView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ScheduledSMSMessageSerializer

    # ✅ List all scheduled messages for logged-in merchant
    def get(self, request):
        # Get only pending and future scheduled messages
        messages = ScheduledSMSMessage.objects.filter(
            merchant=request.user,
            status='pending'
        ).order_by('scheduled_time')
        serializer = ScheduledSMSMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ✅ Create a new scheduled message
    def post(self, request):
        serializer = ScheduledSMSMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(merchant=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Update a scheduled message (e.g., mark as sent/cancelled)
    def patch(self, request, pk=None):
        try:
            message = ScheduledSMSMessage.objects.get(pk=pk, merchant=request.user)
        except ScheduledSMSMessage.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ScheduledSMSMessageSerializer(message, data=request.data, partial=True)
        if serializer.is_valid():
            if request.data.get('status') == 'sent':
                serializer.save(sent_at=timezone.now())
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Delete/Cancel a scheduled message
    def delete(self, request, pk=None):
        try:
            message = ScheduledSMSMessage.objects.get(pk=pk, merchant=request.user)
            message.status = 'cancelled'
            message.save()
            return Response({"message": "Scheduled message cancelled"}, status=status.HTTP_200_OK)
        except ScheduledSMSMessage.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)


class AutomatedMessagingView(APIView):
    permission_classes = [IsAuthenticated]
    
    # ✅ Trigger automated messages manually
    def post(self, request):
        try:
            check_and_send_automated_messages(request.user)
            return Response({
                "message": "Automated messages processed successfully"
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProcessScheduledMessagesView(APIView):
    permission_classes = [IsAuthenticated]
    
    # ✅ Process pending scheduled messages
    def post(self, request):
        try:
            process_scheduled_messages(request.user)
            return Response({
                "message": "Scheduled messages processed successfully"
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AutomatedMessageSettingsView(APIView):
    permission_classes = [IsAuthenticated]
    
    # ✅ Get settings for current merchant
    def get(self, request):
        settings, created = AutomatedMessageSettings.objects.get_or_create(
            merchant=request.user
        )
        serializer = AutomatedMessageSettingsSerializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # ✅ Update settings for current merchant
    def put(self, request):
        settings, created = AutomatedMessageSettings.objects.get_or_create(
            merchant=request.user
        )
        serializer = AutomatedMessageSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)