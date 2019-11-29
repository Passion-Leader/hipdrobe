from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from PIL import Image
from pilkit.processors import Thumbnail
from rest_framework import serializers

import os, json

# Models
from .models import *


# -----------------------------------------------------------------------------
# parts
# -----------------------------------------------------------------------------
def parts(request):
    """
    DB에서 Parts의 부위별 이름을 반환
    """
    parts = list(map(
        lambda part : part['part_name'], Part.objects.values('part_name')))
    json_data = json.dumps({'parts': parts})

    return HttpResponse(json_data, content_type="application/json")


# -----------------------------------------------------------------------------
# cate1
# -----------------------------------------------------------------------------
def cate1(request):
    """
    DB에서 Cate1의 분류 이름을 반환
    """
    part = Part.objects.get(part_name=request.GET.get('part'))
    cate1 = list(map(lambda cate1 : cate1['cate1_name'], 
        Cate1.objects.filter(part=part).values('cate1_name')))
    json_data = json.dumps({'cate1': cate1})

    return HttpResponse(json_data, content_type="application/json")


# -----------------------------------------------------------------------------
# cate2
# -----------------------------------------------------------------------------
def cate2(request):
    """
    DB에서 Cate2의 분류 이름을 반환
    """
    cate1 = Cate1.objects.get(cate1_name=request.GET.get('cate1'))
    cate2 = list(map(lambda cate2 : cate2['cate2_name'], 
        Cate2.objects.filter(cate1=cate1).values('cate2_name')))
    json_data = json.dumps({'cate2': cate2})

    return HttpResponse(json_data, content_type="application/json")



# -----------------------------------------------------------------------------
# upload
# -----------------------------------------------------------------------------
def upload(request):
    """
    이미지를 전송받고 리사이징하고(미구현) 썸네일을 생성.
    투명화 부분 추후 확인해야함. 추후 PNG로 저장 예정.
    """
    if request.method == 'POST':
        if 'image' in request.FILES:
            file = request.FILES['image']
            filename = file._name

            if not os.path.exists(settings.CLOTHES_ROOT):
                os.makedirs(settings.CLOTHES_ROOT)

            fp = open(os.path.join(settings.CLOTHES_ROOT, filename) , 'wb')
            for chunk in file.chunks():
                fp.write(chunk)
            fp.close()

            processor = Thumbnail(width=150, height=150)
            source = Image.open(os.path.join(settings.CLOTHES_ROOT, filename))
            target = processor.process(source)
            target = target.convert('RGB')
            target.save(os.path.join(settings.CLOTHES_ROOT, 
                filename[0:filename.rindex('.')] +'_thumb.jpg'), quality=60)

            json_data = json.dumps({
                'org':filename, 
                'tar':filename[0:filename.rindex('.')] +'_thumb.jpg'
            })

            return HttpResponse(json_data, content_type="application/json")

    return HttpResponse('Failed to Upload File')

# -----------------------------------------------------------------------------
# clothes : userid에 해당되는 데이터 전부 불러오기
# -----------------------------------------------------------------------------
# def clothes(request):
#     u_clothes = Clothes.objects.filter(userid=request.GET.get('userid'))
#     json_data = {
#         "clothes" : u_clothes
#     }
#     data = serializers.serialize('json', json_data)
#     print(data)
#     return HttpResponse(data, content_type="application/json")