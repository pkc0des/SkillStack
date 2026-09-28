from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Avg
from .models import StudySession, Subject

def hours_studied_this_week(user):
    one_week_ago = timezone.now() - timedelta(days=7)
    return StudySession.objects.filter(
        user=user,
        end_date__gte=one_week_ago,
        end_date__lte=timezone.now()
    ).aggregate(Sum("duration"))

def hours_studied_today(user):
    yesterday = timezone.now() - timedelta(days=1)
    return StudySession.objects.filter(
        user = user,
        end_date__gte=yesterday,
        end_date_lte=timezone.now()
    ).aggregate(Sum("duration"))

def average_time_per_day(user):
    total_weekly_hours =  hours_studied_this_week(user)
    return total_weekly_hours.aggregate(Avg("duration")) #type: ignore