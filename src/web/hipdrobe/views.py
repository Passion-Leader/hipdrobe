from django.shortcuts import render, redirect

# Create your views here.
# -----------------------------------------------------------------------------
# index
# -----------------------------------------------------------------------------
def index(request):
    return render(request, 'hipdrobe/index.html')