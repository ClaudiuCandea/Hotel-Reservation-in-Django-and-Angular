"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Booking.views import destination_list,destination_detail, user_list, user_detail,login, destination_filtered_list, reservation_list, reservation_create, reservation_disponibility


urlpatterns = [
    path('admin/', admin.site.urls),
    path('destination/', destination_list, name='destination_list'),
    path('destination/<int:pk>/', destination_detail, name='destination_detail'),
    path('destination/<str:location>/',destination_filtered_list, name='destination_filtered_list'),
    path('user/', user_list, name='user_list'),
    path('user/<int:pk>/', user_detail, name='user_detail'),
    path('user/login/',login,name='user_login'),
    path('reservation/', reservation_create, name='reservation_create'),
    path('reservation/<int:destination>/', reservation_list, name='reservation_list'),
    path('reservation/<str:startDate>/<str:endDate>/', reservation_disponibility,name='reservation_disponibility')

]
