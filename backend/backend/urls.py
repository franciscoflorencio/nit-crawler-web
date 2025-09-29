from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("funding.urls")),
    path("api/", include("articles.urls")),
    path("api/", include("projects.urls")),
]
