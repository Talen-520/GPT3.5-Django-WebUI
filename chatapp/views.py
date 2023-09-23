from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

import openai
from django.http import JsonResponse
from .models import ChatMessage  # Import the ChatMessage model

api_key = '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'
openai.api_key = api_key
def chat_view(request):
    if request.method == 'POST':
        user_message = request.POST.get('message')
        chat_message = ChatMessage(user='User', message=user_message)
        chat_message.save()

        
        # Use GPT-3.5-turbo to generate a response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ]
        )

        bot_response = response['choices'][0]['message']['content']
        chat_message = ChatMessage(user='Bot', message=bot_response)
        chat_message.save()

        return JsonResponse({'bot_response': bot_response})

    return render(request, 'chat.html')