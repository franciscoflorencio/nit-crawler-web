from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FundingOpportunityViewSet

router = DefaultRouter()
router.register(r'opportunities', FundingOpportunityViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
