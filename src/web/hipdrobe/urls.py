from django.urls import path
from . import views

app_name = "hipdrobe"
urlpatterns = [
    path('', views.index, name='index'),
]