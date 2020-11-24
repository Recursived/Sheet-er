from rest_framework import viewsets

from .models import Category, Message, Response
from .serializers import CategorySerializer, MessageSerializer, ResponseSerializer


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


class ResponseViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing, editing and deleting Responses
    """
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
