from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from social_django.models import UserSocialAuth

from .mixins import MultipleFieldLookupMixin
from .serializers import UserSocialAuthSerializer


class UserView(MultipleFieldLookupMixin, RetrieveAPIView):
    """
    A endpoint to get information to get information on a user according to his uid
    """
    queryset = UserSocialAuth.objects.all()
    serializer_class = UserSocialAuthSerializer
    lookup_fields = ("uid", "provider")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
