from rest_framework import viewsets
from rest_framework.views import APIView
from django.db.models import Q
from .models import FundingOpportunity
from .serializers import FundingOpportunitySerializer
from .pagination import LargeResultsSetPagination
from rest_framework.response import Response


class FilterableFieldsView(APIView):
    def get(self, request, *args, **kwargs):
        filterable_field_names = [
            "source",
            "opportunity_status",
            "funding_type",
            "institution",
            "city",
        ]

        filter_data = {}

        for field_name in filterable_field_names:
            try:
                FundingOpportunity._meta.get_field(field_name)
                unique_values = FundingOpportunity.objects.values_list(
                    field_name, flat=True
                ).distinct()
                sorted_values = sorted([value for value in unique_values if value])
                if sorted_values:
                    filter_data[field_name] = sorted_values
            except Exception:
                continue

        return Response(filter_data)


class FundingOpportunityViewSet(viewsets.ModelViewSet):
    serializer_class = FundingOpportunitySerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        queryset = FundingOpportunity.objects.all().order_by("-id")
        params = self.request.query_params

        search_query = params.get("search", None)
        if search_query:
            search_fields = [
                f.name
                for f in FundingOpportunity._meta.get_fields()
                if hasattr(f, "get_internal_type")
                and f.get_internal_type() in ["CharField", "TextField", "URLField"]
            ]

            q_object = Q()
            for field in search_fields:
                q_object |= Q(**{f"{field}__icontains": search_query})
            queryset = queryset.filter(q_object)

        model_fields = [f.name for f in FundingOpportunity._meta.get_fields()]
        for field in model_fields:
            value = params.get(field, None)
            if value:
                queryset = queryset.filter(**{f"{field}__iexact": value})

        return queryset
