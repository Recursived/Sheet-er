from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Sheet, SheetTag, SheetType
from .serializers import (SheetSerializer, SheetTagSerializer,
                          SheetTypeSerializer)


class SheetTagTest(APITestCase):
    def setUp(self):
        self.post_data = {
            'id': 1,
            'label': 'derivative',
        }

        self.data = {
            'id': 2,
            'label': 'topology'
        }

        self.sheettag = SheetTag.objects.create(**self.data)
        self.json_data = SheetTagSerializer(self.sheettag).data
        self.json_data.update({"label": "primitives"})

    def test_get_401_without_key(self):
        response = self.client.get(reverse('sheettag-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)




class SheetTypeTest(APITestCase):
    def setUp(self):
        self.post_data = {
            "id": 1,
            'label': 'derivative',
        }

        self.data = {
            "id": 2,
            'label': 'topology'
        }

        self.sheettype = SheetType.objects.create(**self.data)
        self.json_data = SheetTypeSerializer(self.sheettype).data
        self.json_data.update({"label": "primitives"})

    def test_get_401_without_key(self):
        response = self.client.get(reverse('sheettype-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



class SheetTest(APITestCase):
    def setUp(self):
        # On créé un sheetag et type pour les fiches fictives
        sheettag = SheetTag.objects.create(id=1, label="Espace convexe")
        sheettag = SheetTag.objects.create(id=2, label="Espace hilbertien")
        sheettype = SheetType.objects.create(id=1, label="Maths")

        self.post_data = {
            'id': 1,
            'content': 'Bonjour les enfants',
            'title': "Titre enfant",
            'mark': 4.0,
            'plagiarism_rate': 0.7,
            'subject': 1,
            'tags': [1, 2]
        }

        self.data = {
            'id': 2,
            'content': 'Bonjour les adultes',
            'title': 'Titre adultes',
            'mark': 4.0,
            'plagiarism_rate': 0.3,
            'subject': sheettype
        }

        self.sheet = Sheet.objects.create(**self.data)
        self.sheet.tags.set([sheettag])
        self.json_data = SheetSerializer(self.sheet).data
        self.json_data.update({"title": "Titre changé"})

    def test_get_401_without_key(self):
        response = self.client.get(reverse('sheet-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
