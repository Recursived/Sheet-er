from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from .views import SheetTypeViewSet, SheetTagViewSet, SheetViewSet, AvisViewSet, SheetCommentViewSet 

# Create a router and register our viewsets with it.
router = DefaultRouter()

# We change the name of the front page of the API
router.get_api_root_view().cls.__name__ = "Sheet Api endpoint"
router.get_api_root_view().cls.__doc__ = "Api endpoint for elements related to sheets (sheets, tags, type...)"

router.register(r'sheet', SheetViewSet)
router.register(r'sheettag', SheetTagViewSet)
router.register(r'sheettype', SheetTypeViewSet)
router.register(r'avis', AvisViewSet)
router.register(r'sheetcomment', SheetCommentViewSet)


# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls))
]