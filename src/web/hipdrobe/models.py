from django.db import models

# Create your models here.
class User(models.Model):
    userid = models.CharField(primary_key=True, max_length=20)
    userpwd = models.CharField(max_length=20)
    nick = models.CharField(max_length=12)
    created_at =models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    logged_at=models.DateTimeField(auto_now=True)
    level_point=models.IntegerField(default=0)
    level=models.IntegerField(default=1)
    count_top=models.IntegerField(default=0) # 상의 보유 개수
    count_bottom=models.IntegerField(default=0) # 하의 보유 개수
    count_shoes=models.IntegerField(default=0) # 신발 보유 개수
    gender = models.IntegerField()


class Part(models.Model):
    part = models.CharField(primary_key=True, max_length=10)
    part_name = models.CharField(max_length=10)


class Cate1(models.Model):
    cate1 = models.CharField(primary_key=True, max_length=20)
    cate1_name = models.CharField(max_length=20)
    part = models.ForeignKey(Part, on_delete=models.CASCADE)

class Cate2(models.Model):
    cate2 = models.CharField(max_length=20)
    cate2_name = models.CharField(max_length=20)
    cate1 = models.ForeignKey(Cate1, on_delete=models.CASCADE)
    worn = models.IntegerField(default=0) # 해당 카테고리 옷 입은 횟수
    

class Clothes(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE) # 유저id
    cate1_name = models.CharField(max_length=20) # 카테고리1 이름
    cate2_name = models.CharField(max_length=20) # 카테고리2 이름
    part = models.CharField(max_length=10) # 부위
    url = models.CharField(max_length=256) # 옷 사진 url
    color = models.CharField(max_length=40, null=True) # 색상
    solid = models.BooleanField(null=True) # 단색 여부
    pattern = models.CharField(max_length=15, null=True) # solid, stripe, dot, printing
    season = models.CharField(max_length=30, null=True) # multi-select로 (봄, 여름, 가을, 겨울)
    descript = models.CharField(max_length=100, null=True) # 비고
    worn = models.IntegerField(default=0) # 옷 입은 횟수
    brand = models.CharField(max_length=30, null=True)
    texture = models.CharField(max_length=15, null=True)



