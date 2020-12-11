from django.contrib.auth.models import User
from oauth2_provider.models import AccessToken, RefreshToken
from rest_framework import mixins, viewsets
from rest_framework.generics import (RetrieveAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from social_django.models import UserSocialAuth

from .mixins import MultipleFieldLookupMixin
from .serializers import RefreshTokenSerializer, UserSerializer


class UserView(
        MultipleFieldLookupMixin,
        RetrieveAPIView):
    """
    A endpoint to get information on a user according to his uid
    """
    queryset = UserSocialAuth.objects.all()
    serializer_class = RefreshTokenSerializer
    lookup_fields = ("uid", "provider")
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        token_val = request.META.get('HTTP_AUTHORIZATION').split(" ")[1]
        token_instance = AccessToken.objects.get(token=token_val)
        rf_instance = RefreshToken.objects.get(access_token=token_instance)
        social_user_instance = self.get_object()
        # On supprime les instances inutiles
        AccessToken.objects.exclude(id=rf_instance.access_token.id).filter(
            user=social_user_instance.user).delete()
        RefreshToken.objects.exclude(id=rf_instance.id).filter(
            user=social_user_instance.user).delete()
        # On serialize le refresh token
        serializer = self.get_serializer(rf_instance)

        return Response(serializer.data)


class UserViewSet(
        viewsets.ViewSet,
        RetrieveUpdateDestroyAPIView):
    """
    A simple ViewSet for viewing and editing Sheeter users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
