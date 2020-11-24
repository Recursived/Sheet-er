from django.contrib.auth.models import User
from django.db.models import fields
from rest_framework import serializers
from social_django.models import UserSocialAuth
from oauth2_provider.models import RefreshToken, AccessToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'date_joined', 'last_login']


class AccessTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessToken
        fields = ['token', 'expires', 'scope']


class RefreshTokenSerializer(serializers.ModelSerializer):
    access_token = AccessTokenSerializer(read_only=True)
    user = UserSerializer(read_only=True) 

    class Meta:
        model = RefreshToken
        fields = ['token', 'user', 'access_token',
                  'created', 'updated', 'revoked']
