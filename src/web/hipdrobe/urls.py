from django.urls import path
from . import views, apis


app_name = "hipdrobe"
urlpatterns = [
    path('', views.index, name='index'),
    path('wardrobe/items/', views.items, name="items" ),
    path('wardrobe/coordi/', views.coordi, name="coordi"),
    path('wardrobe/stat/', views.stat, name="stat" ),
    path('regist/',views.regist, name="regist"),
    




    # 페이지 요청이 아닌 기능 요청은 아래쪽에서 관리
    # 대표적으로 AJAX 요청이 여기에 해당
    path('wardrobe/upload/', apis.upload, name="upload"),
]