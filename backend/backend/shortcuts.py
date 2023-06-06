import datetime
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings


def bad_request(data):
    return Response(data, status=status.HTTP_400_BAD_REQUEST)


def client_side_redirect(url):
    # this will be intercepted by axios and user will navigate to the url
    return Response({'redirect': url})


def get_domain(set_on_sub_domain):
    if set_on_sub_domain:
        return f".{settings.DOMAIN_NAME}"
    return None


def set_cookie(response, key, value, set_on_sub_domain):
    expires = datetime.datetime.utcnow() + datetime.timedelta(days=365)
    domain = get_domain(set_on_sub_domain)

    # For Testing makin it un secure on local
    secure = False if settings.IN_LOCAL else True
    response.set_cookie(
        key,
        value, secure=secure, httponly=True, samesite='Lax',  expires=expires)


def delete_cookie(response, key, set_on_sub_domain):
    domain = get_domain(set_on_sub_domain)
    response.delete_cookie(key)
