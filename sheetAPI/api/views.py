from rest_framework import viewsets
from .models import SheetType, SheetTag, Sheet
from .serializers import SheetSerializer, SheetTagSerializer, SheetTypeSerializer


class SheetViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Sheets.
    """
    queryset = Sheet.objects.all()
    serializer_class = SheetSerializer

class SheetTagViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing SheetTag.
    """
    queryset = SheetTag.objects.all()
    serializer_class = SheetTagSerializer
    

class SheetTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing SheetType.
    """
    queryset = SheetType.objects.all()
    serializer_class = SheetTypeSerializer
    paginator = None