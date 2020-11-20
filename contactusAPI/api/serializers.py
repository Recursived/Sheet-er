from rest_framework import serializers

from .models import Category, Message


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'parent']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'title', 'content', 'author',
                  'date', 'category', 'state']
