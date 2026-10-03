from django.urls import path
from . import views

app_name = "study"

urlpatterns = [
    path("dashboard", views.dashboard, name="dashboard"),
    path("pomodoro", views.pomodoro, name="pomodoro"),
    path("log_hours", views.log_hours, name="log_hours")
]