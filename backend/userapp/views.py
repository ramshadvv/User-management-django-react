from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from accounts.models import Accounts
from userapp.api.serializers import AccountsSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import json
# Create your views here.


class User(APIView):
    def post(self, request):
        user = AccountsSerializer(data=request.data)
        print(user.is_valid())
        if user.is_valid():
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        data            = json.loads(request.body)
        item            = Accounts.objects.get(id=pk)
        username        = data['username']
        first_name      = data['first_name']
        last_name       = data['last_name']
        email           = data['email']
        phone_number    = data['phone']
        item.username   = username
        item.first_name = first_name
        item.last_name  = last_name
        item.email      = email
        item.phone      = phone_number
        item.save()
        userData =  AccountsSerializer(instance=item)
        return Response(userData.data,status=status.HTTP_200_OK)


@api_view(['GET'])
def userlist(request):
    users = Accounts.objects.filter(is_admin=False)
    serializer = AccountsSerializer(users, many=True)
    return Response(serializer.data)


class deleteUser(APIView):
    def post(self, request, pk):
        user = Accounts.objects.get(id=pk)
        user.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def blockUser(request, pk):
    user = Accounts.objects.get(id=pk)
    if user.is_active == True:
        user.is_active    = False
    else:
        user.is_active    = True        
    user.save()
    return Response(200)

class profileUser(APIView):
    def get(self, request):
        user = request.user
        user = Accounts.object.get(username = user)
        userData = AccountsSerializer(instance=user)
        return Response(userData.data,status=status.HTTP_200_OK)

