
from rest_framework import serializers
from rest_framework.authtoken.admin import User
from rest_framework.validators import UniqueValidator

from . import models


class BlogdataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Blogdata
        fields = ['id','title','content','user']


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    username = serializers.CharField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all(), message="username aready exist")])
    email = serializers.EmailField(required=False, validators=[
        UniqueValidator(queryset=User.objects.all(), message="Email aready exists")])
    password = serializers.CharField(min_length=6, required=True, write_only=True)
    is_staff = serializers.BooleanField(default=True)

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "email", "password","is_staff"]



    def get_first_name(self,obj):
        return obj.first_name.capitalize()

    def get_last_name(self, obj):
        return obj.last_name.capitalize()






