from django.urls import path
from .. import views
from . import views as apiviews
from rest_framework_simplejwt.views import (    
    TokenRefreshView,
)

urlpatterns = [
    path('api/', apiviews.getRoutes, name="home"),
    path('api/token/', apiviews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('all/', views.userlist, name="userlist"),
    path('profile/', views.profileUser.as_view(), name="profile"),
    path('register/', views.User.as_view(), name="register"),
    path('edituser/<int:pk>/', views.User.as_view(), name="edituser"),
    path('deleteuser/<int:pk>/', views.deleteUser.as_view(), name="deleteuser"),
    path('blockuser/<int:pk>/', views.blockUser, name="blockuser"),
]