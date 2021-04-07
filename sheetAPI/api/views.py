from rest_framework import filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Sheet, SheetTag, SheetType
from .serializers import (SheetSerializer, SheetTagSerializer,
                          SheetTypeSerializer)


class SheetViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Sheets.
    """
    queryset = Sheet.objects.all()
    serializer_class = SheetSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['subject__id', 'author']
    search_fields = ['title']


class SheetTagViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing SheetTag.
    """
    queryset = SheetTag.objects.all()
    serializer_class = SheetTagSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['label']
    ordering_fields = ['label']
    ordering = ['label']


class SheetTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing SheetType.
    """
    queryset = SheetType.objects.all()
    serializer_class = SheetTypeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['label']
    ordering_fields = ['label']
    ordering = ['label']
    paginator = None
