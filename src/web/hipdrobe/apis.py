# django 
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.conf import settings
from django.http import HttpResponse

# Models
from .models import *

# other python packages
import os, json
from PIL import Image, ExifTags
from pilkit.processors import Thumbnail, ResizeToFit
import uuid
# from .removebg import removebg
from rest_framework import serializers




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
@require_POST
def upload(request):
    """
    이미지를 전송받고 리사이징 및 초보적인 투명화를 진행
    유저에거 컨펌 받기 위해 사진 두 장(원본 리사이즈드, 투명화)의 참조 경로를 리턴함
    """
    if 'image' in request.FILES:
        userfile = request.FILES['image']
        filename = userfile._name
        
        # 디렉토리가 없으면 생성
        if not os.path.exists(settings.CLOTHES_ROOT):
            os.makedirs(settings.CLOTHES_ROOT)
        if not os.path.exists(settings.CLOTHES_ROOT_TMP):
            os.makedirs(settings.CLOTHES_ROOT_TMP)

        # 임시 파일명 생성
        infix = str(uuid.uuid4()).split('-')[4]
        temp_file =  infix + '_' + filename
        temp_file_png = \
            infix + '_' +  filename[0:filename.rindex('.')] + '.png'

        # 원본 저장
        fp = open(
            os.path.join(settings.CLOTHES_ROOT_TMP, temp_file) , 'wb')
        for chunk in userfile.chunks():
            fp.write(chunk)
        fp.close()

        # 스마트폰 카메라로 찍은 경우 특정 orientation 에서 이미지가 돌아가는 문제 수정
        source = Image.open(
            os.path.join(settings.CLOTHES_ROOT_TMP, temp_file))
        if source._getexif() != None: 
            exif = dict((ExifTags.TAGS[k], v) \
                for k, v in source._getexif().items() if k in ExifTags.TAGS)
            if 'Orientation' in list(exif.keys()):
                source = source.rotate(-90, expand=True) \
                    if exif['Orientation'] == 6 \
                    else source

        # 임시 리사이즈 및 저장 
        processor = ResizeToFit(width=250, height=250)
        target = processor.process(source)
        target.save(os.path.join(settings.CLOTHES_ROOT_TMP, temp_file_png))


        # 초보적 배경 제거
        if source.mode == "RGBA" or "transparency" in source.info:
            mod_file_png = temp_file_png
        else:
            mod_file_png = removebg(settings.CLOTHES_ROOT_TMP, temp_file_png)

        json_data = json.dumps({
            'org': temp_file_png, 
            'mod': mod_file_png
        })

        # processor = Thumbnail(width=150, height=150)
        # source = Image.open(os.path.join(settings.CLOTHES_ROOT_TMP, temp_file))
        # target = processor.process(source)

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