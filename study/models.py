from django.db import models
from accounts.models import Profile


# Create your models here.

class Subject(models.Model):
    name = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=20, blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name}, color: {self.color}"

class StudySession(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="study_sessions")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="study_sessions")
    duration = models.PositiveIntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    log_date = models.DateTimeField(auto_now_add=True)
    is_pomodoro = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user} studied {self.subject} for {self.duration} minutes."

