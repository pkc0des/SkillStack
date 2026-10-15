#type: ignore
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Avg, Q
from .models import StudySession, Subject
from accounts.models import Profile
import math

def get_sessions_since(user, initital_time):
    return StudySession.objects.filter(
        user=get_profile(user),
        end_time__gte=initital_time,
        end_time__lte=timezone.now(),
    )

def get_hours_over_time(user, initial_time, type: str | None = None):
    return get_sessions_since(user, initial_time).aggregate(Sum("duration"))

def minutes_per_subject_this_week(user):
    one_week_ago = timezone.now() - timedelta(days=7)
    return (
        get_sessions_since(user, one_week_ago)
        .values("subject__name", "subject__color")
        .annotate(total_minutes=Sum("duration"))
        .order_by("-total_minutes")
    )

def minutes_per_study_type_this_week(user):
    one_week_ago = timezone.now() - timedelta(days=7)
    return (
        get_sessions_since(user, one_week_ago)
        .values("is_pomodoro")
        .annotate(total_minutes=Sum("duration"))
        .order_by("-total_minutes")
    )

def format_study_type_minutes(study_type_results):
    pomodoro_dict = {}
    logged_dict = {}
    
    log_information = []
    
    for study_type in study_type_results:
        
        if study_type.get("is_pomodoro") == True:
            study_type_name = "Pomodoro"
        else:
            study_type_name = "Logged"
        
            
        study_type["formatted_minutes"] = format_minutes_to_hours_minutes(study_type["total_minutes"])
        study_type["type"] = study_type_name

        if study_type_name == "Pomodoro":
            pomodoro_dict = study_type
            log_information.append(pomodoro_dict)
            
        elif study_type_name == "Logged":
            logged_dict = study_type
            log_information.append(logged_dict)
    
    return log_information


def hours_studied_this_week(user):
    one_week_ago = timezone.now() - timedelta(days=7)
    time_studied = get_hours_over_time(user, one_week_ago)

    if time_studied["duration__sum"] is None:
        return 0
    
    return time_studied["duration__sum"]

def hours_studied_today(user):
    yesterday = timezone.localtime().replace(hour=0, minute=0, second=0, microsecond=0)
    time_studied =  get_hours_over_time(user, yesterday)

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
        formatted_time += f"{hours} {'hours' if hours > 1 else 'hour'}"
        if minutes_remainder:
            formatted_time += " "

    if minutes_remainder != 0:
        formatted_time += f"{minutes_remainder} minutes"

    if formatted_time == "":
        return "0 minutes"

    return formatted_time

def format_subject_results(subject_results) -> list:
    programming_dict = None
    math_dict = None
    science_dict = None
    ela_dict = None

    subjects = []

    for subject in subject_results:
        subject_name = subject.get("subject__name")
        subject["formatted_minutes"] = format_minutes_to_hours_minutes(subject["total_minutes"])
        if subject_name == "Programming":
            programming_dict = subject
            subjects.append(programming_dict)
        elif subject_name == "Mathematics":
            math_dict = subject
            subjects.append(math_dict)
        elif subject_name == "Science":
            science_dict= subject
            subjects.append(science_dict)
        elif subject_name == "English/SS":
            ela_dict = subject
            subjects.append(ela_dict)

    return subjects


def get_subjects():
    return Subject.objects.all()

