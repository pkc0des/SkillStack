from django.shortcuts import render
from .models import StudySession, Subject
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required()
def dashboard(request):
    user = request.user

    return render(request, "study/dashboard.html")