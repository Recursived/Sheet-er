from django.contrib.auth.models import User
from rest_framework import serializers
from social_django.models import UserSocialAuth


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name',
                  'last_name', 'email', 'date_joined']


class UserSocialAuthSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserSocialAuth
        fields = ['uid', 'user', 'provider',
                  'created', 'modified', "extra_data"]
