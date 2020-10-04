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

    def test_can_create_sheettag(self):
        response = self.client.post(
            reverse('sheettag-list'),
            self.post_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_can_read_sheettag_list(self):
        response = self.client.get(reverse('sheettag-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_sheettag_detail(self):
        response = self.client.get(
            reverse('sheettag-detail', args=[self.data["id"]]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_sheettag(self):
        response = self.client.put(
            reverse('sheettag-detail', args=[self.data["id"]]), self.json_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_delete_sheettag(self):
        response = self.client.delete(
            reverse('sheettag-detail', args=[self.data["id"]]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


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

    def test_can_create_sheettype(self):
        response = self.client.post(
            reverse('sheettype-list'),
            self.post_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_can_read_sheettype_list(self):
        response = self.client.get(reverse('sheettype-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_sheettype_detail(self):

        response = self.client.get(
            reverse('sheettype-detail', args=[self.data["id"]]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_sheettype(self):
        response = self.client.put(
            reverse('sheettype-detail', args=[self.data["id"]]), self.json_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_delete_sheettype(self):
        response = self.client.delete(
            reverse('sheettype-detail', args=[self.data["id"]]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


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

    def test_can_create_sheet(self):
        response = self.client.post(
            reverse('sheet-list'),
            self.post_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_can_read_sheet_list(self):
        response = self.client.get(reverse('sheet-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_sheet_detail(self):

        response = self.client.get(
            reverse('sheet-detail', args=[self.data["id"]]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_sheet(self):
        response = self.client.put(
            reverse('sheet-detail', args=[self.data["id"]]), self.json_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_delete_sheet(self):
        response = self.client.delete(
            reverse('sheet-detail', args=[self.data["id"]]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
