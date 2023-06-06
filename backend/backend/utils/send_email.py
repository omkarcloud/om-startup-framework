from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import requests
from backend.utils.exceptions import VagueException

def send_email(subject, template_file, context, recipient_list, from_email = settings.MAIL_SENDER_EMAIL):
    html_content = render_to_string(
        template_file, context)

    text_content = strip_tags(html_content)
    headers = {
        'accept': 'application/json',
        'api-key': settings.BREVO_API_KEY,
        'content-type': 'application/json',
    }

    json_data = {
        'sender': {
            'name': 'yourcompanyname',
            'email': from_email,
        },
        'to': [
            {
                'email': recipient_list,
            },
        ],
        'subject': subject,
        'htmlContent': html_content,
    }

    response = requests.post('https://api.sendinblue.com/v3/smtp/email', headers=headers, json=json_data)

    if not response.ok:
        raise VagueException()

    return 
