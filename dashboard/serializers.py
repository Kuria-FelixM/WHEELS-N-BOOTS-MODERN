from rest_framework import serializers
from .models import Location, Apartment
from core.serializers import TenantSerializer


class ApartmentSerializer(serializers.ModelSerializer):
    tenants = TenantSerializer(many=True, read_only=True)
    locationName = serializers.SlugRelatedField(
        queryset=Location.objects.all(),
        slug_field="locationName"   # use Location.locationName instead of PK
    )

    class Meta:
        model = Apartment
        fields = [
            "apartmentId",
            "locationName",
            "apartmentName",
            "billingFee",
            "created_at",
            "tenants",
        ]
class LocationSerializer(serializers.ModelSerializer):
    apartments = ApartmentSerializer(many=True, read_only=True)

    class Meta:
        model = Location
        fields = [
            "locationId",
            "locationName",
            "description",
            "created_at",
            "apartments",
        ]