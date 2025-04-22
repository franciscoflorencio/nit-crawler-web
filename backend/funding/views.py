from django.shortcuts import render
from rest_framework import viewsets
from .models import FundingOpportunity
from .serializers import FundingOpportunitySerializer

# Create your views here.
class FundingOpportunityViewSet(viewsets.ModelViewSet):
    queryset=FundingOpportunity.objects.all()
    serializer_class=FundingOpportunitySerializer
