from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from PIL import Image
from pilkit.processors import Thumbnail
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

