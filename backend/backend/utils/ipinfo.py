import requests

from backend.utils.exceptions import VagueException


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_ipinfo_data(ip):
    response = requests.get(
        f"https://www.omkar.cloud/backend/ipinfo/?ip={ip}"
    )

    if not response.ok:
        raise VagueException()

    data = response.json()
    return data