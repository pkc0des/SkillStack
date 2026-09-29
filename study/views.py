from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import StudySession, Subject
from .utils import hours_studied_this_week, hours_studied_today, average_time_per_day, format_minutes_to_hours_minutes

# Create your views here.

@login_required()
def dashboard(request):
    user = request.user

    studied_this_week = hours_studied_this_week(user)
    studied_today = hours_studied_today(user)
    average_time_studied = average_time_per_day(user)

    return render(request, "study/dashboard.html", {
        "weekly_hours": format_minutes_to_hours_minutes(studied_this_week),
        "today_hours": format_minutes_to_hours_minutes(studied_today), 
        "average_time_studied": average_time_studied
    })