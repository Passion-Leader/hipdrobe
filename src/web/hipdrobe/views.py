from django.shortcuts import render, redirect

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
    return render(request, 'hipdrobe/regist.html')