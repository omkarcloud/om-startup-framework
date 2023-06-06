from django.urls import path, include
from rest_framework import routers

from .views import auth, test, ipinfo,url_shortener, send_email,  users, stats


users_router = routers.DefaultRouter()
users_router.register(r'users', users.UserViewSet, basename='users')


actions_router = routers.DefaultRouter()
actions_router.register(r'actions', users.ActionViewSet, basename='actions')

user_on_boarding_router = routers.DefaultRouter()
user_on_boarding_router.register(
    r'users-onboarding', users.UserOnboardingViewSet, basename='users-onboarding')

send_email_router = routers.DefaultRouter()
send_email_router.register(r'send-email', send_email.SendEmailEventViewSet)

url_shortener_router = routers.DefaultRouter()
url_shortener_router.register(r'short-urls', url_shortener.ShortURLViewSet)

urlpatterns = [

    path('auth/sign-up/', auth.sign_up),
    path('auth/google-auth/', auth.google_auth),
    path('auth/sign-up-validate/', auth.sign_up_validate),
    path('auth/sign-up-email-verify/<str:token>/', auth.sign_up_email_verify),
    path('auth/sign-in/', auth.sign_in),
    path('auth/sign-out/', auth.sign_out),
    path('auth/me/', auth.me),
    path('auth/reset-password-send/', auth.reset_password_send),
    path('auth/reset-password-verify/<str:token>/',
         auth.reset_password_verify_token),
    path('auth/reset-password-change-validate/',
         auth.reset_password_change_validate),
    path('auth/reset-password-change/<str:token>/', auth.reset_password_change),
    path('test/', test.test),

    path('ipinfo/', ipinfo.get_ipinfo),
    path('stats/', stats.get_stats,  name='get-stats'),

    path('users/export/', users.download),

    path('users/get-first-name-by-referral-code/<str:code>/', users.get_first_name_by_referral_code,  name='get-first-name-by-referral-code'),
    path('users/increment-referral-link-clicks/<str:code>/', users.increment_referral_link_clicks,  name='increment-referral-link-clicks'),
    path('users/<int:user_id>/actions/', users.UserActionViewSet.as_view({'get': 'list'}),name='user-actions'),
    
    
    path('', include(send_email_router.urls)),

    path('', include(users_router.urls)),
    path('', include(actions_router.urls)),
    path('', include(user_on_boarding_router.urls)),

    path('', include(url_shortener_router.urls)),
    

]
