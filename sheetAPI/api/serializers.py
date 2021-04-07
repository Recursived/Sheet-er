from rest_framework import serializers
from pprint import pprint

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
    tags = SheetTagSerializer(many=True, read_only=True)
    subject = SheetTypeSerializer(read_only=True)

    class Meta:
        model = Sheet
        depth = 1
        fields = ['id', 'content', 'descr' , 'title',  'subject', 'mark', 'next_sheet',
                  'tags', 'creation_date', 'plagiarism_rate', 'locale', 'author']

    def create(self, validated_data):
        subject_data = self.context["request"].data.get("subject")
        tags_data = self.context["request"].data.get("tags")
        lst_tags = []
        for tag in tags_data:
            lst_tags.append(SheetTag.objects.get(id=tag.get("id")))
        subject = SheetType.objects.get(id=subject_data.get("id"))
        sheet = Sheet.objects.create(subject=subject, **validated_data)
        sheet.tags.add(*lst_tags)
        return sheet
    
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        subject_data = self.context["request"].data.get("subject")
        tags_data = self.context["request"].data.get("tags")
        link_sheet_data = self.context["request"].data.get("next_sheet")
        lst_tags = []
        for tag in tags_data:
            lst_tags.append(SheetTag.objects.get(id=tag.get("id")))
        subject = SheetType.objects.get(id=subject_data.get("id"))
        next_sheet = Sheet.objects.get(id=link_sheet_data)
        instance.next_sheet = next_sheet
        instance.subject = subject
        instance.tags.add(*lst_tags)
        instance.save()
        return instance