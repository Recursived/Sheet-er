from rest_framework import filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Sheet, SheetComment, SheetTag, SheetType, SheetComment, Avis
from .serializers import (SheetSerializer, SheetTagSerializer,
                          SheetTypeSerializer, SheetCommentSerializer,
                          AvisSerializer)


class SheetViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Sheets.
    """
    queryset = Sheet.objects.all()
    serializer_class = SheetSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['subject__id', 'author']
    search_fields = ['title', 'content', 'descr', 'subject__label', 'tags__label']
    ordering_fields = ['nb_click']
    ordering = ['nb_click', 'subject__label','title']


class SheetCommentViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Sheet comments.
    """
    queryset = SheetComment.objects.all()
    serializer_class = SheetCommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sheetid', 'author']

class AvisViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Like/Dislikes.
    """
    queryset = Avis.objects.all()
    serializer_class = AvisSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author', 'target_id', 'target_type']
    paginator = None

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
