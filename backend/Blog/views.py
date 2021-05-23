from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.tokens import RefreshToken

from . import models
from .BlogSerilizer import UserSerializer, BlogdataSerializer


@api_view(['GET'])
def getAllUsers(request):
    users = User.objects.all()
    seralizer = UserSerializer(users, many=True)
    return Response(data=seralizer.data)

@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
def login(request):
    try:
        data = request.data
        password = data["password"]
        username = data["username"]
        userdata = User.objects.get(username=username)
        if userdata.check_password(password):
            # token,_= Token.objects.get_or_create(user_id= userdata.id)
            token = RefreshToken.for_user(userdata)
            user = UserSerializer(userdata).data
            user["token"]=str(token.access_token)
            return Response(data=user, status=status.HTTP_200_OK)
        else:
            massage = {'detail': "User with this password doesnot exist"}
            return Response(massage, status=status.HTTP_401_UNAUTHORIZED)
    except:
        massage = {'detail': "User with this username or email doesnot exist"}
        return Response(massage, status=status.HTTP_401_UNAUTHORIZED)
@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
def register(request):
    password = request.data["password"]
    serializer = UserSerializer(data={**request.data, "password":make_password(password)})
    if serializer.is_valid():
        serializer.save()
        user = User.objects.last()
        # token,_= Token.objects.get_or_create(user_id=user.id)
        token = RefreshToken.for_user(user)
        serializer2 = UserSerializer(user).data
        serializer2["token"]=str(token.access_token)
        return Response(data=serializer2,status=status.HTTP_201_CREATED)
    else:
        return Response(data=serializer.errors, status=400)

@api_view(['POST'])
def BlogPostCreate(request):
    serializer = BlogdataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)
    student_cerated = models.Blogdata.objects.last()
    responce_student = BlogdataSerializer(student_cerated).data
    return Response(status=status.HTTP_201_CREATED, data=responce_student)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def BlogPostUpdate(request,id):
     blogdata = models.Blogdata.objects.get(user=request.user.id,id=id)
     serializer = BlogdataSerializer(data=request.data, instance=blogdata)
     if serializer.is_valid():
         serializer.save()
     else:
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     return Response(status=status.HTTP_200_OK, data=serializer.data)
@api_view(['DELETE'])
# @permission_classes([IsAdminUser])
@permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def BlogPostDelete(request,id):
    blogdata = models.Blogdata.objects.get(user=request.user.id, id=id)
    blogdata.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET'])
# @permission_classes([IsAdminUser])
@permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def BlogPostView(request):
    blogdata = models.Blogdata.objects.filter(user=request.user.id)
    serializer = BlogdataSerializer(blogdata,many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
# @permission_classes([IsAdminUser])
# @authentication_classes([TokenAuthentication])
def BlogPost(request):
    blogdata = models.Blogdata.objects.all()
    serializer = BlogdataSerializer(blogdata,many=True).data
    return Response(serializer, status=status.HTTP_200_OK)












