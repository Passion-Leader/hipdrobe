from django.shortcuts import render, redirect
from django.conf import settings
from django.http import HttpResponse
from PIL import Image
from pilkit.processors import Thumbnail
import os, json

def upload(request):
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

            json_data = json.dumps({'org':filename, 'tar':filename[0:filename.rindex('.')] +'_thumb.jpg'})
            return HttpResponse(json_data, content_type="application/json")

            # return HttpResponse(filename[0:filename.rindex('.')] )

    return HttpResponse('Failed to Upload File')
