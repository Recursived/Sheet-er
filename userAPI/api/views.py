from oauth2_provider.contrib.rest_framework import (TokenHasReadWriteScope,
                                                    TokenHasScope)
from rest_framework import viewsets, permissions

from .models import SheeterUser
from .serializers import SheeterUserSerializer


class SheeterUserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Users.
    """
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = SheeterUser.objects.all()
    serializer_class = SheeterUserSerializer