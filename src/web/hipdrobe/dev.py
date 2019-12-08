from .models import *


def clearAllWornCount():
    clothesList = Clothes.objects.all()
    for clothes in clothesList:
        clothes.worn = 0
        clothes.save()

