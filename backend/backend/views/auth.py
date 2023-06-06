from django.conf import settings
import requests
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import UserAction
from backend.utils.model_utils import save_action
from backend.utils.email_templates import send_meeting_email
from backend.validators import is_good_mail
from backend.utils.exceptions import CustomException, VagueException
from backend.models import User, ResetPasswordToken, SignUpToken
from backend.permissions import IsAdmin, IsAuthenticated
from backend.serializers import SignInSerializer, SignUpSerializer, UserSerializer
from backend.utils.hash_password import get_hashed_password
from backend.utils.jwt import create_access_token, create_refresh_token
from backend.shortcuts import bad_request, delete_cookie, set_cookie
from backend.validators import get_validation_errors,  normalize_django_errors, validate_password_strength
from django.core.exceptions import ObjectDoesNotExist
from backend.validators import errors_dict_to_string
import json
from backend.utils.email_templates import send_reset_password_verify_email, send_sign_up_verify_email
from backend.utils.utils import generate_uuid
import pydash


def get_first_name(full_name):
    """Returns the first name from a full name string"""
    return pydash.title_case(full_name.split()[0])

def has_user_with_email(email):
    return User.objects.filter(email=email).exists()


def get_sign_up_validate_errors(data):
    errors = get_validation_errors(data, SignUpSerializer)
    validate_password_strength(data, errors)
    return errors


@api_view(['GET'])
def sign_up_validate(request):
    errors = get_sign_up_validate_errors(request.query_params)
    return Response(errors)


@api_view(['POST'])
def sign_up(request):
    data = request.data.copy()
    errors = get_sign_up_validate_errors(data)
    if errors != {}:
        if errors.get('email') is not None and str(errors['email']) == 'user with this email already exists.':
            return bad_request({"message": 'A user with this email address already exists. Please use a different email address.'})
        else:
            return bad_request({"message": errors_dict_to_string(errors)})
    elif not is_good_mail(data['email']):
        raise CustomException('Please use a different email address.')
    

    data["password"] = get_hashed_password(data["password"])
    data['auth_method'] = User.email_auth_method

    token = SignUpToken(
        token=generate_uuid(),
        data=json.dumps(data)
    )
    token.save()
    send_sign_up_verify_email(token.token, data["email"])
    return Response({})


def set_auth_cookies(response, id):
    set_cookie(response, 'access_token',
               create_access_token(id), True)
    set_cookie(response, 'refresh_token',
               create_refresh_token(id), True)


def delete_auth_cookies(response):
    delete_cookie(response, 'access_token', True)
    delete_cookie(response, 'refresh_token', True)
    return response


def create_authenticate_success_response(id):
    response = redirect('/')
    set_auth_cookies(response, id)
    return response


@api_view(['GET'])
def sign_up_email_verify(request, token):

    try:
        tokenmodel: SignUpToken = SignUpToken.objects.get(token=token)
        if tokenmodel.is_expired():
            return redirect('/messages/sign-up-email-verify-expired/')
        data = json.loads(tokenmodel.data)
        serializer = SignUpSerializer(data=data)

        if serializer.is_valid():
            user = User(**serializer.validated_data)
            user.auth_method = User.email_auth_method
            user.save()
            tokenmodel.delete()
            send_meeting_email(get_first_name(user.name), user.email)
            save_action(request, UserAction.type_signup, {}, user)
            return create_authenticate_success_response(user.id)
        return bad_request({"message": errors_dict_to_string(normalize_django_errors(serializer.errors))})
    except ObjectDoesNotExist:
        return redirect('/messages/sign-up-email-verify-invalid/')


def get_email_error_response(data):
    serializer = SignInSerializer(data=data)
    if serializer.is_valid():
        if has_user_with_email(data["email"]):
            not_exisits_with_email = not User.objects.filter(
                email=data["email"], auth_method=User.email_auth_method).exists()
            if not_exisits_with_email:
                return {"message": 'Sign in with Google instad of Email.', }
        else:
            return {"message": 'Email does not exist.', }
        return None

    email_validation_error: str = normalize_django_errors(serializer.errors())[
        "email"]
    email_validation_error.replace('This field', 'Email')
    return {"message": email_validation_error, }


@api_view(['POST'])
def sign_in(request):
    data = request.data
    error_response = get_email_error_response(data)
    if error_response is not None:
        return bad_request(error_response)
    user: User = User.objects.get(email=data["email"])

    if not user.check_password(data['password']):
        return bad_request({"message": "Password is invalid.", })
    save_action(request, UserAction.type_signin, {}, user)
    return create_authenticate_success_response(user.id)


@api_view(['GET'])
def sign_out(request):
    save_action(request, UserAction.type_signout, {})
    return delete_auth_cookies(redirect('/'))


@api_view(['POST'])
def reset_password_send(request):
    data = request.data
    error_response = get_email_error_response(data)
    if error_response is not None:
        return bad_request(error_response)

    token = ResetPasswordToken(
        token=generate_uuid(),
        data=json.dumps(data)
    )
    token.save()
    send_reset_password_verify_email(token.token, data["email"])

    return Response({})


def get_reset_password_error_response(token):
    try:
        tokenmodel: ResetPasswordToken = ResetPasswordToken.objects.get(
            token=token)
        if tokenmodel.is_expired():
            return {"redirect": '/messages/reset-password-expired-or-invalid/', "message": "Token Expired"}, None
        return None, tokenmodel
    except ObjectDoesNotExist:
        return {"redirect": '/messages/reset-password-expired-or-invalid/', "message": "Invalid token"}, None


@api_view(['GET'])
def reset_password_verify_token(request, token):
    error_response, _ = get_reset_password_error_response(token)
    if error_response is not None:
        return Response(error_response)
    return Response({})


def get_reset_password_change_errors(data):
    if data["password"] == '':
        return {"password": 'This field may not be blank.'}
    errors = {}
    validate_password_strength(data, errors)
    return errors


@api_view(['GET'])
def reset_password_change_validate(request):
    errors = get_reset_password_change_errors(request.query_params)
    return Response(errors)


@api_view(['GET'])
def me(request):
    if not IsAuthenticated().has_permission(request, None):
        return Response({"is_authenticated": False, "is_banned": False, "is_admin": False})
    current = User.objects.get(id=request.user_id)
    result = UserSerializer(current).data
    
    result['is_authenticated'] = True
    result['is_admin'] = IsAdmin().has_permission(request, None)
    
    result['referred_users_count'] = User.objects.filter(referred_by = current).count()  

    result['referred_by_first_name'] = get_first_name(current.referred_by.name) if current.referred_by else None
        
    return Response(result)


@api_view(['POST'])
def reset_password_change(request, token):
    data = request.data
    errors = get_reset_password_change_errors(data)
    if errors != {}:
        return bad_request({"message": errors_dict_to_string(errors)})

    error_response, tokenmodel = get_reset_password_error_response(token)
    if error_response is not None:
        return bad_request(error_response)

    email = json.loads(tokenmodel.data)["email"]

    user: User = User.objects.get(email=email)
    user.password = get_hashed_password(data["password"])
    user.save()

    tokenmodel.delete()
    save_action(request, UserAction.type_resetpassword, {}, user)
    return create_authenticate_success_response(user.id)


GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'


def google_validate_id_token(*, id_token: str) -> bool:
    # Reference: https://developers.google.com/identity/sign-in/web/backend-auth#verify-the-integrity-of-the-id-token
    response = requests.get(
        GOOGLE_ID_TOKEN_INFO_URL,
        params={'id_token': id_token}
    )

    if not response.ok:
        raise VagueException()

    data = response.json()
    audience = data['aud']

    if audience != settings.OAUTH_CLIENT_ID:
        raise VagueException()

    return data


def get_or_create_google_user(request, name, email):
    if not is_good_mail(email):
        raise CustomException('Please use a different email address.')

    try:
        user = User.objects.get(email=email)
        if user.auth_method == User.email_auth_method:
            raise CustomException('Sign In with Email instead of Google.')
        elif user.auth_method == User.google_auth_method:
            save_action(request, UserAction.type_signin, {}, user)
            return user.id
    except User.DoesNotExist:
        user = User(name=name, email=email, password='',
                    auth_method=User.google_auth_method)
        user.save()
        send_meeting_email(get_first_name(user.name), user.email)
        save_action(request, UserAction.type_signup, {}, user)
        return user.id


@api_view(['POST'])
def google_auth(request):
    id_token = request.headers.get('Authorization')
    data = google_validate_id_token(id_token=id_token)

    name = data['name']
    email = data['email']
    id = get_or_create_google_user(request, name, email)
    return create_authenticate_success_response(id)
