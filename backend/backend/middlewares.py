from backend.views.auth import set_auth_cookies
from backend.utils.jwt import verify_access_token_and_get_id, verify_refresh_token_and_get_id
from django.conf import settings


def is_admin(user_id) -> bool:
    admin_ids = ["1"]
    return str(user_id) in admin_ids

is_authenticated = True
# is_authenticated = False

def handle_request(request):
    should_set_auth_cookies = False
    access_token = request.COOKIES.get('access_token')
    id = verify_access_token_and_get_id(access_token)
    request.user_id = None
    if id is not None:
        request.user_id = id
    else:
        refresh_token = request.COOKIES.get('refresh_token')
        id = verify_refresh_token_and_get_id(refresh_token)
        if id is not None:
            request.user_id = id
            should_set_auth_cookies = True

    # For Development Only
    if settings.IN_LOCAL:
        if is_authenticated: 
            request.user_id = 1
        
    request.is_admin = request.user_id is not None and is_admin(request.user_id)
    
    return id, should_set_auth_cookies


def auth_middleware(get_response):

    def middleware(request):
        id,  should_set_auth_cookies = handle_request(request)
        response = get_response(request)
        if should_set_auth_cookies:
            set_auth_cookies(response, id)

        return response

    return middleware
