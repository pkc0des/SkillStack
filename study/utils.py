from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Avg
from .models import StudySession, Subject
from accounts.models import Profile
import math

def hours_studied_this_week(user):
    one_week_ago = timezone.now() - timedelta(days=7)
    time_studied = StudySession.objects.filter(
        user=get_profile(user),
        end_time__gte=one_week_ago,
        end_time__lte=timezone.now()
    ).aggregate(Sum("duration"))

    if time_studied["duration__sum"] is None:
        return 0
    
    return time_studied["duration__sum"]

def hours_studied_today(user):
    yesterday = timezone.now() - timedelta(days=1)
    time_studied =  StudySession.objects.filter(
        user = get_profile(user),
        end_time__gte=yesterday,
        end_time__lte=timezone.now()
    ).aggregate(Sum("duration"))

    if time_studied["duration__sum"] is None:
        return 0

    return time_studied["duration__sum"]

def average_time_per_day(user):
    total_weekly_hours =  hours_studied_this_week(user)

    return format_minutes_to_hours_minutes(total_weekly_hours / 7)

def get_profile(user):
    return Profile.objects.get(user=user)

def format_minutes_to_hours_minutes(minutes):
    hours = math.floor(minutes / 60)
    minutes_remainder = round(minutes % 60)

    formatted_time = ""

    if hours != 0:
        formatted_time += f"{hours} hours"

    if minutes_remainder != 0:
        formatted_time += f" {minutes_remainder} minutes"

    if formatted_time == "":
        return "0 minutes"

    return formatted_time