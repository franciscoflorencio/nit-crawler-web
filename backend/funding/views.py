from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .models import FundingOpportunity
from .serializers import FundingOpportunitySerializer, SourceSerializer
from .pagination import LargeResultsSetPagination


class UniqueSourcesViewSet(viewsets.ViewSet):
    def list(self, request, *args, **kwargs):
        # Query unique sources
        unique_sources = FundingOpportunity.objects.values_list(
            "source", flat=True
        ).distinct()
        # Remove None or empty values
        sources = [{"source": source} for source in unique_sources if source]
        # Serialize the data
        serializer = SourceSerializer(sources, many=True)
        return Response(serializer.data)


class FundingOpportunityViewSet(viewsets.ModelViewSet):
    queryset = FundingOpportunity.objects.all()
    serializer_class = FundingOpportunitySerializer
    pagination_class = LargeResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["source"]
