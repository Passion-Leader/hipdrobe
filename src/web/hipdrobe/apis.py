# django 
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.conf import settings
from django.http import HttpResponse
from django.forms.models import model_to_dict
from PIL import Image
from pilkit.processors import Thumbnail
from rest_framework import serializers
from django.db.models import Q

import os, json

# Models
from .models import *

# other python packages
import os, json
from PIL import Image, ExifTags
from pilkit.processors import Thumbnail, ResizeToFit
import uuid
from .removebg import removebg
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
# upload image
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
        uuid_list = str(uuid.uuid4()).split('-')
        print(uuid_list)
        prefix = uuid_list[0] + '-' + uuid_list[4]
        temp_file =  prefix + filename[filename.rindex('.')-1:]
        print(temp_file)
        temp_file_png = \
            temp_file[0:temp_file.rindex('.')] + '-resized.png'

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
# additem
# -----------------------------------------------------------------------------
# 나중에 로그인 필수 넣기
@require_POST
def additem(request):
    data = request.POST

    try:
        # 저장할 유저 선택 및 옷 이미지 저장 경로 생성
        user = User.objects.get(userid='user01@test.com')
        destPath = destFile = os.path.join(settings.CLOTHES_ROOT, user.userid)
        if not os.path.exists(destPath):
            os.makedirs(destPath)

        # 선택한 파일을 자신의 CLOTHES_ROOT/계정명/파일명 으로 저장
        filename = data['url'][data['url'].rindex('/')+1:]
        srcfile = os.path.join(settings.CLOTHES_ROOT_TMP, filename )
        destFile = os.path.join(destPath, filename)
        os.rename(srcfile, destFile)

        # 임시 파일 삭제
        _deleteTmpImage(settings.CLOTHES_ROOT_TMP, filename[:22])
        
        # DB 저장 가즈아~
        clothes = Clothes()
        clothes.userid = user
        clothes.part = data['part']
        clothes.cate1_name = data['cate1']
        clothes.cate2_name = data['cate2']
        clothes.color = data['color']
        clothes.solid = True if data['colortype'] == 'true' else False
        clothes.season = str(data.getlist('season'))[1:-1].replace("'", "")
        if data['pattern'] != ''    : clothes.pattern = data['pattern']
        if data['texture'] != ''    : clothes.texture = data['texture']
        if data['brand'] != ''      : clothes.brand = data['brand']
        if data['descript'] != ''   : clothes.descript = data['descript']
        clothes.url = '/clothes/' + user.userid + '/' + filename
        clothes.save()

        json_data = json.dumps({
            'result': 'success', 
        })

    except:
        filename = data['url'][data['url'].rindex('/')+1:]
        _deleteTmpImage(settings.CLOTHES_ROOT_TMP, filename[:22])

        json_data = json.dumps({
            'result': 'fail', 
        })

    return HttpResponse(json_data, content_type="application/json")


# -----------------------------------------------------------------------------
# clothes : userid와 클릭한 name을 기준으로 옷 url 리스트 넘기기
# -----------------------------------------------------------------------------
def clothes(request):
    userid = request.GET.get('userid')
    name = request.GET.get('name')
    # print(name)

    if name == '상의':
        url = list(map(lambda clothes : clothes['url'], 
            Clothes.objects.filter(Q(userid = userid) & Q(part = name) & ~Q(cate1_name__endswith = '아우터')).values('url')))
        json_data = json.dumps({'url': url})
        print(json_data)

    elif name == '아우터':
        url = list(map(lambda clothes : clothes['url'], 
            Clothes.objects.filter(Q(userid = userid) & Q(cate1_name__endswith = name)).values('url')))
        json_data = json.dumps({'url': url})
        print(json_data)

    elif name == '하의':
        url = list(map(lambda clothes : clothes['url'], 
            Clothes.objects.filter(Q(userid = userid) & Q(part = name)).values('url')))
        json_data = json.dumps({'url': url})
        print(json_data)

    else:
        url = list(map(lambda clothes : clothes['url'], 
            Clothes.objects.filter(Q(userid = userid) & Q(cate1_name = name)).values('url')))
        json_data = json.dumps({'url': url})
        print(json_data)

    return HttpResponse(json_data, content_type="application/json")



# -----------------------------------------------------------------------------
# Temporary Image File 삭제
# -----------------------------------------------------------------------------
def _deleteTmpImage(path, infix):
    try:
        filenames = os.listdir(path)
        for filename in filenames:
            full_filename = os.path.join(path, filename)
            if not os.path.isdir(full_filename) and infix in filename:
                os.remove(full_filename)

    except Exception as e:
        print(e)



# -----------------------------------------------------------------------------
# clothes_detail : 클릭한 옷의 url로 옷 전체 데이터 받아서 detail 구현
# -----------------------------------------------------------------------------
def clothes_detail(request):
    userid = request.GET.get('userid')
    url = request.GET.get('url')
    print(url)

    u_clothes = Clothes.objects.get(url = url)
    clothe = model_to_dict(u_clothes)
    json_data = json.dumps(clothe)
    print(json_data)

    return HttpResponse(json_data, content_type="application/json")
