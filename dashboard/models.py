from django.db import models
from django.conf import settings


class Location(models.Model):
    locationId = models.AutoField(primary_key=True)
    merchant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="locations")
    locationName = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["locationName"]

    def __str__(self):
        return self.name

class Apartment(models.Model):
    apartmentId = models.AutoField(primary_key=True)
    locationName = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="apartments")
    apartmentName = models.CharField(max_length=100)
    billingFee = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["locationName", "apartmentName"]

    def __str__(self):
        return f"{self.apartmentName} ({self.locationName.locationName})"


