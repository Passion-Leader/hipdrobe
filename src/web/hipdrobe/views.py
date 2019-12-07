from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.http import HttpResponse
# from django.contrib.auth.decorators import login_required
# from django.views.decorators.http import require_POST
from django.contrib import auth
from django.contrib.auth.models import User
import simplejson as json
from django.views.generic import CreateView 
from .forms import UserForm




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

class UserCreateView(CreateView): 
    form_class = UserForm   
    template_name = 'hipdrobe/signup.html'
    success_url = "/" 

def signup(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            new_user = User.objects.create_user(**form.cleaned_data)
            login(request, new_user)
            return redirect('index')
        else:
            return HttpResponse('사용자명이 이미 존재합니다.')
    else:
        form = UserForm()
        return render(request, 'memo_app/adduser.html', {'form': form})

def logout(request):
    auth.logout(request)
    return redirect('hipdrobe:index')