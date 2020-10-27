from django.conf.urls import include, url
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import UserView

# Create a router and register our viewsets with it.
router = DefaultRouter()

# We change the name of the front page of the API
router.get_api_root_view().cls.__name__ = "User Api endpoint"
router.get_api_root_view().cls.__doc__ = "Api endpoint for elements related to users"


# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    path('user/<uid>/<provider>', UserView.as_view(), name="user_exist") # uid --> id unique + provider --> facebook, google
    # url(r'^', include(router.urls))
]
