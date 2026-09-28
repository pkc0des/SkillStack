from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .forms import RegisterForm, LoginForm
from django.contrib.auth.models import User
from .models import Profile
from .utils import check_account_exists
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.urls import reverse
from django.contrib.auth.decorators import login_required

# Create your views here.
def home(request):
    return render(request, "accounts/home.html")

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            if check_account_exists(username):
                print("Account Already Exists!")
                return HttpResponseRedirect(reverse('accounts:register'))

            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
            )

            Profile.objects.create(user=user)

            return redirect('accounts:login')
        
    return render(request, "accounts/register.html")

def login(request):
    if request.method == "POST":
        form = LoginForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            user = authenticate(request, username=username, password=password)
            if username is not None:
                auth_login(request, user)
                return redirect('study:dashboard')
            return redirect('accounts:register')
        return redirect('accounts:login')
    return render(request, "accounts/login.html")

@login_required()
def logout(request):
    auth_logout(request)
    return HttpResponseRedirect(reverse("accounts:login"))
