from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import SheeterUser
from .serializers import SheeterUserSerializer


class SheeterUserTest(APITestCase):
    def setUp(self):
        self.post_data = {
            'user_id': '12312341',
            'name': 'Alexandre MANETA',
            'email': 'test1@email.com',
            'profile_pic': 'https://github.com/',
            'account_type': 'Fb'
        }

        self.data = {
            'user_id': '12312321',
            'name': 'Kevin Tran',
            'email': 'test@email.com',
            'profile_pic': 'https://github.com/',
            'account_type': 'Fb'
        }

        self.user = SheeterUser.objects.create(**self.data)
        self.json_data = SheeterUserSerializer(self.user).data
        self.json_data.update({"name": "Alexandre MANETA"})

    def test_can_create_user(self):
        response = self.client.post(reverse('sheeteruser-list'), self.post_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_can_read_user_list(self):
        response = self.client.get(reverse('sheeteruser-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_user_detail(self):
        response = self.client.get(
            reverse('sheeteruser-detail', args=[self.user.user_id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_user(self):
        response = self.client.put(
            reverse('sheeteruser-detail', args=[self.user.user_id]), self.json_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_delete_user(self):
        response = self.client.delete(
            reverse('sheeteruser-detail', args=[self.user.user_id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)



