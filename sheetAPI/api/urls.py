from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from .views import SheetTypeViewSet, SheetTagViewSet, SheetViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'sheet', SheetViewSet)
router.register(r'sheettag', SheetTagViewSet)
router.register(r'sheettype', SheetTypeViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls))
]
