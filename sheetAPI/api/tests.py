from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from .models import Sheet, SheetTag, SheetType
from .serializers import (SheetSerializer, SheetTagSerializer,
                          SheetTypeSerializer)


class SheetTagTest(APITestCase):

    def test_get_401_without_key(self):
        response = self.client.get(reverse('sheettag-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)




class SheetTypeTest(APITestCase):

    def test_get_401_without_key(self):
        response = self.client.get(reverse('sheettype-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class SheetTest(APITestCase):

    def test_get_401_without_key(self):
        response = self.client.get(reverse('sheet-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
