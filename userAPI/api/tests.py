from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import SheeterUser


class CreateSheeterUserTest(APITestCase):
    def setUp(self):
        self.data = {
            'user_id': '12312321', 
            'name': 'Kevin Tran', 
            'email': 'test@email.com', 
            'profile_pic' : 'https://github.com/',
            'account_type' : 'Fb'
            }

    def test_can_create_user(self):
        response = self.client.post(reverse('sheeteruser-list'), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ReadSheeterUserTest(APITestCase):
    def setUp(self):
        self.data = {
            'user_id': '12312321', 
            'name': 'Kevin Tran', 
            'email': 'test@email.com', 
            'profile_pic' : 'https://github.com/',
            'account_type' : 'Fb'
            }
        self.user = SheeterUser.objects.create(**self.data)

    def test_can_read_user_list(self):
        response = self.client.get(reverse('sheeteruser-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_can_read_user_detail(self):
        response = self.client.get(reverse('sheeteruser-detail', args=[self.user.user_id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# class UpdateSheeterUserTest(APITestCase):
#     def setUp(self):
#         self.superuser = User.objects.create_superuser(
#             'john', 'john@snow.com', 'johnpassword')
#         self.client.login(username='john', password='johnpassword')
#         self.user = User.objects.create(username="mike", first_name="Tyson")
#         self.data = UserSerializer(self.user).data
#         self.data.update({'first_name': 'Changed'})

#     def test_can_update_user(self):
#         response = self.client.put(
#             reverse('user-detail', args=[self.user.id]), self.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)


# class DeleteSheeterUserTest(APITestCase):
#     def setUp(self):
#         self.superuser = User.objects.create_superuser(
#             'john', 'john@snow.com', 'johnpassword')
#         self.client.login(username='john', password='johnpassword')
#         self.user = User.objects.create(username="mikey")

#     def test_can_delete_user(self):
#         response = self.client.delete(
#             reverse('user-detail', args=[self.user.id]))
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
