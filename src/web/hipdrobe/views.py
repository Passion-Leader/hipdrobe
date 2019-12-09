from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.http import HttpResponse
# from django.contrib.auth.decorators import login_required
# from django.views.decorators.http import require_POST
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
import simplejson as json
from .forms import UserForm, LoginForm




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

def coordi_detail(request, c_id):
    # 여기에 로그인 세션 체크 등 코드가 들어가야 함
    return render(request, 'hipdrobe/wardrobe-coordi-detail.html')

def stat(request):
    # 여기에 로그인 세션 체크 등 코드가 들어가야 함
    return render(request, 'hipdrobe/wardrobe-stat.html')



def signup(request):
    if request.method == "POST":
        print("11")
        form = UserForm(request.POST)
        print("12")
        if form.is_valid():
            print("13")
            new_user = User.objects.create_user(**form.cleaned_data)
            login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')

            return redirect('hipdrobe:index')
        else:
            return HttpResponse('이미 존재하는 계정입니다.')
    else:
        print("33")
        form = UserForm()
        return render(request, 'hipdrobe/signup.html', {'form': form})

def signin(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        email = request.POST['email']
        print(email)
        password = request.POST['password']
        print(password)
        user = authenticate(username = email, password = password)
        print(user)
        if user is not None:
            login(request, user)
            return redirect('hipdrobe:index')
        else:
            return HttpResponse('로그인 실패. 다시 시도 해보세요.')
    else:
        form = LoginForm()
        return render(request, 'hipdrobe/login.html', {'form': form})

def logout(request):
    auth.logout(request)
    return redirect('hipdrobe:index')
