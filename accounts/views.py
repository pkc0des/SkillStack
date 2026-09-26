from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, "accounts/home.html")

def register(request):
    return render(request, "accounts/register.html")

def login(request):
    return render(request, "accounts/login.html")