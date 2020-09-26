from rest_framework import viewsets
from .models import SheeterUser
from .serializers import SheeterUserSerializer


class SheeterUserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Users.
    """
    queryset = SheeterUser.objects.all()
    serializer_class = SheeterUserSerializer
