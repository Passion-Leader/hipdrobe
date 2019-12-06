from django.urls import path
from . import views, apis


app_name = "hipdrobe"
urlpatterns = [
    path('', views.index, name='index'),
    path('wardrobe/items/', views.items, name="items" ),
    path('wardrobe/coordi/', views.coordi, name="coordi"),
    path('wardrobe/stat/', views.stat, name="stat" ),
    path('regist/',views.regist, name="regist"),
    path('login/',views.login, name="login"),
    




    # 페이지 요청이 아닌 기능 요청은 아래쪽에서 관리
    # 대표적으로 AJAX 요청이 여기에 해당
    path('apis/parts/', apis.parts, name="parts"),
    path('apis/cate1/', apis.cate1, name="cate1"),
    path('apis/cate2/', apis.cate2, name="cate2"),
    path('apis/upload/', apis.upload, name="upload"),
    path('apis/clothes/', apis.clothes, name="clothes"),
    path('apis/additem/', apis.additem, name="additem"),
    path('apis/coordi/new/', apis.coordi_new, name="coordi_new"),
    path('check_id/',views.check_id,name="check_id"),
    path('apis/clothes_detail/', apis.clothes_detail, name="clothes_detail"),
]
