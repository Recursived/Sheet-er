from rest_framework import viewsets

from .models import Category, Message
from .serializers import CategorySerializer, MessageSerializer


# Create your views here.
class MessageViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing, editing and deleting message
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing, editing and deleting categories
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
