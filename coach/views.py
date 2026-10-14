import json
from django.shortcuts import render
from django.http import JsonResponse
from .utils import get_full_prompt

# Create your views here.

def coach(request):
    if request.method == "POST":
        session_info = json.loads(request.body)
        user_prompt = session_info['prompt']

        if not user_prompt:
            return JsonResponse(data={
              "message": "You must enter a prompt"
            }, status=400)

        full_prompt = get_full_prompt(user_prompt)

    return render(request, "coach/chat.html")
