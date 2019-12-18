from rest_framework import serializers
from .models import Sheet, SheetType, SheetTag

class SheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sheet
        fields = [ 'content', 'title',  'subject', 'mark', 'tags', 'creation_date']


class SheetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetType
        fields = ['label']

class SheetTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetTag
        fields = ['label']
