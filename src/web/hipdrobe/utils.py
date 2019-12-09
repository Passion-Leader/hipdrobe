from django.forms.models import model_to_dict

import os, re, json, pytz

from django.utils import timezone
from datetime import datetime, timedelta


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
# 서버 로컬 타임으로 변경
# -----------------------------------------------------------------------------
def _convert_to_localtime(utctime):
    fmt = '%Y-%m-%d %H:%M:%S.%f'
    utc = utctime.replace(tzinfo=pytz.UTC)
    localtz = utc.astimezone(timezone.get_current_timezone())
    return localtz.strftime(fmt)


# -----------------------------------------------------------------------------
# 데일리룩을 작성하거나 교체할 때 입을 옷 들의 worn 값을 +- 해준다.
# -----------------------------------------------------------------------------
def _change_worn_count(user, coordi, val):
    coordi_dict = model_to_dict(coordi)
    elemList = json.loads(re.sub("'", '"', coordi_dict['elem_list']))
    for elem in elemList:
        imgUrl = elem['imgurl']
        item = user.clothes_set.get(url=imgUrl)
        item.worn += val
        item.save()
    