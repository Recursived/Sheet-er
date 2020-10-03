from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from .views import SheeterUserViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()

# We change the name of the front page of the API
router.get_api_root_view().cls.__name__ = "User Api endpoint"
router.get_api_root_view().cls.__doc__ = "Api endpoint for elements related to users"

router.register(r'sheetuser', SheeterUserViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls))
]