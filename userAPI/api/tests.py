from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth.models import User
from social_django.models import UserSocialAuth



class SheeterUserTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username="alex", password="123321")
        self.social_user = UserSocialAuth.objects.create(
            user = self.user,
            provider = "facebook",
            uid=3779421658752048
        )
    
    def test_user_existence(self):
        response = self.client.get(
            f"/user/{self.social_user.uid}/{self.social_user.provider}"
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_doesnt_exist(self):
        response = self.client.get(
            f"/user/{3779421658752031}/{self.social_user.provider}"
            )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
