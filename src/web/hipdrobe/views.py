from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

from .models import User

import simplejson as json
# from django.contrib.auth.models import User
# from django.contrib import auth


# Create your views here.
# -----------------------------------------------------------------------------
# index
# -----------------------------------------------------------------------------
def index(request):
    return render(request, 'hipdrobe/index.html')


# -----------------------------------------------------------------------------
# wardrobe menu
# -----------------------------------------------------------------------------
def items(request):
    # 여기에 로그인 세션 체크 등 코드가 들어가야 함
    return render(request, 'hipdrobe/wardrobe-items.html')

def coordi(request):
    # 여기에 로그인 세션 체크 등 코드가 들어가야 함
    return render(request, 'hipdrobe/wardrobe-coordi.html')

def stat(request):
    # 여기에 로그인 세션 체크 등 코드가 들어가야 함
    return render(request, 'hipdrobe/wardrobe-stat.html')

def regist(request):
        if request.method=="POST":
            
            userid1=request.POST["userid"]
            
            pw=request.POST["userpw1"]
            
            nickname=request.POST["nick"]
            
            gender1=request.POST.get('gender')
            
            if gender1=='male':
                gender1=1
            else:
                gender1=2
            
            
            new_user=User(userid=userid1,userpwd=pw,nick=nickname,gender=gender1)            
            
            new_user.save()            
            return redirect("hipdrobe:index")
        else: 
            return render(request,'hipdrobe/regist.html')
        
def check_id(request):
    try:
        user = User.objects.get(userid=request.GET['userid'])
    
    
    except Exception as e:
        user = None
        print(user)
    result = {
    'result':'success',
    # 'data' : model_to_dict(user)  # console에서 확인
    'data' : "not exist" if user is None else "exist"
    }
    return JsonResponse(result)


def login(request):
    if request.method=="POST":
        username=request.POST['userid']
        password=request.POST['userpwd']
        user=auth.authenticate(request,username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect(request, user)
            return redirect('index')
        else:
            return render(request,'index.html',{'error':'오류'})
        
    else:
        return render(request,'index.html')

def logout(request):
    auth.logout(request)
    return redirect('index')