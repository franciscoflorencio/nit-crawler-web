from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FundingOpportunityViewSet, FilterableFieldsView

router = DefaultRouter()
router.register(r"opportunities", FundingOpportunityViewSet, basename="opportunity")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "filterable-fields/", FilterableFieldsView.as_view(), name="filterable-fields"
    ),
]
