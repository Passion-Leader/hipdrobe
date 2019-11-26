from django.db import models

# Create your models here.
class User(models.Model):
    userid = models.CharField(max_length=50)
    userpw = models.CharField(max_length=20)
    nick = models.CharField(max_length=12)
    created_at =models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField()
    logged_at=models.DateTimeField(auto_now=True)
    level_point=models.IntegerField()
    level=models.IntegerField()
    item_top=models.IntegerField()
    item_bottom=models.IntegerField()
    item_shoes=models.IntegerField()

