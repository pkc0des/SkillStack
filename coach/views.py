from django.shortcuts import render

# Create your views here.

def coach(request):
    return render(request, "coach/chat.html")
