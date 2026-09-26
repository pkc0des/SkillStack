from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path("", views.home , name="homepage"),
    path("register", views.register, name="register"),
    path("login", views.login, name="login")
]