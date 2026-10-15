import json
from django.shortcuts import render
from django.http import JsonResponse, StreamingHttpResponse
from django.contrib.auth.decorators import login_required
from .utils import get_full_prompt, client

# Create your views here.
@login_required()
def coach(request):
    if request.method == "POST":
        session_info = json.loads(request.body)
        user_prompt = session_info.get("prompt")

        if not user_prompt:
            return JsonResponse(data={
              "message": "You must enter a prompt"
            }, status=400)

        full_prompt = get_full_prompt(user_prompt, request.user)

        try:
            response = client.models.generate_content_stream(
                model="gemini-3.5-flash-lite",
                contents=full_prompt
            )
            first_chunk = next(response)
        except Exception as e:
            print(e)
            return JsonResponse(data={
                "message": 'The coach is busy right now, please try again later!'
            }, status=503)

        return StreamingHttpResponse(
            get_stream(first_chunk, response),
            content_type="text/plain"
        )
    
    return render(request, "coach/chat.html")

def get_stream(first_chunk, response):
    if first_chunk.text is not None and first_chunk.text != "":
        yield first_chunk.text.encode()
        
    try:
        for chunk in response:
            if chunk.text is None or chunk.text == "":
                continue
            yield chunk.text.encode()

    except Exception as e:
        print(e)
        yield "\n\nConnection lost".encode()

        
    

    
