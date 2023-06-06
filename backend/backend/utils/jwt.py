from django.conf import settings
import datetime
import jwt


def create_access_token(id):
    return jwt.encode({"id": id, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)}, settings.SECRET_ACCESS_TOKEN, algorithm="HS256")


def create_refresh_token(id):
    return jwt.encode({"id": id, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=14)},
                      settings.SECRET_REFRESH_TOKEN, algorithm="HS256")

def verify_token_and_get_id(token, secret):
    if token is None:
        return None
    try:
        payload = jwt.decode(
            token, secret, algorithms=["HS256"])
        return payload["id"]
    except:
        return None


def verify_access_token_and_get_id(token):
    return verify_token_and_get_id(token, settings.SECRET_ACCESS_TOKEN)


def verify_refresh_token_and_get_id(token):
    return verify_token_and_get_id(token, settings.SECRET_REFRESH_TOKEN)
