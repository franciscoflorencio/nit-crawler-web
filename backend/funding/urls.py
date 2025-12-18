from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FundingOpportunityViewSet, FilterableFieldsView, CountryCountView

router = DefaultRouter()
router.register(r"opportunities", FundingOpportunityViewSet, basename="opportunity")

urlpatterns = [
    path("opportunities/country-counts/", CountryCountView.as_view(), name="country-counts"),
    path(
        "filterable-fields/", FilterableFieldsView.as_view(), name="filterable-fields"
    ),
    path("", include(router.urls)),
]
