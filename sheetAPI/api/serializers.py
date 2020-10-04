from rest_framework import serializers

from .models import Sheet, SheetTag, SheetType


class SheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sheet
        fields = ['id', 'content', 'title',  'subject', 'mark',
                  'tags', 'creation_date', 'plagiarism_rate']


class SheetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetType
        fields = ['id', 'label']


class SheetTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetTag
        fields = ['id', 'label']
