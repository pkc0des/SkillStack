from django.db import models
from accounts.models import Profile

# Create your models here.

class Subject(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="subjects")
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class StudySession(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="study_sessions")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="study_sessions")
    duration = models.PositiveIntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    log_date = models.DateTimeField()

