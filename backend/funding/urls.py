from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FundingOpportunityViewSet, UniqueSourcesViewSet

router = DefaultRouter()
router.register(r"opportunities", FundingOpportunityViewSet)
router.register(r"unique-sources", UniqueSourcesViewSet, basename="unique-sources")

urlpatterns = [
    path("", include(router.urls)),  # Namespace all router URLs under /api/
]
