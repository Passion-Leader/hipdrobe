from django.urls import path
from . import views

app_name = "hipdrobe"
urlpatterns = [
    path('', views.index, name='index'),
    path('wardrobe/items/', views.items, name="items" ),
    path('wardrobe/coordi/', views.coordi, name="coordi"),
    path('wardrobe/stat/', views.stat, name="stat" ),
    path('wardrobe/regist/',views.regist, name="regist"),
]