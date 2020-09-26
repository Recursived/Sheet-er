from rest_framework import serializers
from .models import SheeterUser

class SheeterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheeterUser
        fields = [ 'user_id', 'name', 'account_type', 'email', 'profile_pic']
