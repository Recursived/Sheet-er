from rest_framework import serializers

from .models import Sheet, SheetTag, SheetType





class SheetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetType
        fields = ['id', 'label']


class SheetTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetTag
        fields = ['id', 'label']


class SheetSerializer(serializers.ModelSerializer):
    tags = SheetTagSerializer(read_only=True)
    subject = SheetTypeSerializer(read_only=True)
    class Meta:
        model = Sheet
        fields = ['id', 'content', 'descr' , 'title',  'subject', 'mark',
                  'tags', 'creation_date', 'plagiarism_rate', 'locale']