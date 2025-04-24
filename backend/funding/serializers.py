from rest_framework import serializers
from .models import FundingOpportunity


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingOpportunity
        fields = ["source"]


class FundingOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingOpportunity
        fields = "__all__"
