import json
from backend.utils.send_email import send_email
from django.conf import settings
from django.conf import settings

def create_reset_password_link(token):
    return f'{settings.APP_URL}/auth/reset-password-verify/{token}/'


def send_reset_password_verify_email(token, to_email):
    link = create_reset_password_link(token)
    send_email('Reset Password Verification Email',
               'mail_reset_password_verify.html', {'link': link}, to_email)

def send_generic_email(subject, content):
    text_content = json.dumps(content, indent=4)
    content = f"{subject}\n{text_content}"

    send_email(subject,
               'mail_generic.html', {"data": text_content }, settings.MAIL_RECIEVER_EMAIL)

def send_meeting_email(fname, to_email):
    send_email("Schedule Meeting",
               'mail_meeting.html', {"fname": fname }, to_email, settings.SALES_EMAIL)
    
def send_user_email(fname, to_email, subject, template):
    send_email(subject,
               template, {"fname": fname }, to_email, settings.SALES_EMAIL)


def create_sign_up_verify_link(token):
    return f'{settings.APP_URL}/backend/auth/sign-up-email-verify/{token}/'

def send_sign_up_verify_email(token, to_email):
    link = create_sign_up_verify_link(token)
    send_email('Sign Up Verification Email',
               'mail_sign_up_verify.html', {'link': link}, to_email)