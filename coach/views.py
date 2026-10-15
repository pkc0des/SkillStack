import json
from django.shortcuts import render
from django.http import JsonResponse
from .utils import get_full_prompt, client

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

        try:
            response = client.models.generate_content(
                model="gemini-flash-latest",
                contents=full_prompt
            )
        except Exception as e:
            print(e)
            return JsonResponse(
                data={
                    "message": 'The coach is busy right now, please try again later!'
                }, status=503)

        print(response.text)

        return JsonResponse(data={
            "message": response.text
        }, status=200)

    return render(request, "coach/chat.html")
