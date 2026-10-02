from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import StudySession, Subject
from .utils import hours_studied_this_week, hours_studied_today, average_time_per_day, format_minutes_to_hours_minutes, minutes_per_subject_this_week, format_subject_results

# Create your views here.

@login_required()
def dashboard(request):
    user = request.user

    studied_this_week = hours_studied_this_week(user)
    studied_today = hours_studied_today(user)
    average_time_studied = average_time_per_day(user)
    time_per_subject = minutes_per_subject_this_week(user)
    formatted_subjects = format_subject_results(time_per_subject)

    print(formatted_subjects)

   

    return render(request, "study/dashboard.html", {
        "weekly_hours": format_minutes_to_hours_minutes(studied_this_week),
        "today_hours": format_minutes_to_hours_minutes(studied_today), 
        "average_time_studied": average_time_studied,
        "subject_stats": formatted_subjects
    })

@login_required()
def log_hours(request):

    return render(request, "study/log_hours.html")