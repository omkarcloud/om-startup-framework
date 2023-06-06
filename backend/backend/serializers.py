from rest_framework import serializers
from backend.models import *


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

class AdminUserSerializer(serializers.ModelSerializer):
    total_actions = serializers.SerializerMethodField('get_total_actions')
    actions_today = serializers.SerializerMethodField('get_actions_today')
    last_action_date = serializers.SerializerMethodField('get_last_action_date')

    def get_total_actions(self, user):
        return user.total_actions

    def get_actions_today(self, user):
        return user.actions_today

    def get_last_action_date(self, user):
        return user.last_action_date

    class Meta:
        model = User
        exclude = ['password']

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "pending_amount", "paid_amount", "is_banned"
        ]


class UpdateOnboardingUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "first_referrer", "first_url_params", "has_on_boarded",
                  "company_name", 
                  "phone_number",
                  "provides_service",
                    # "country", 
                    "employee_size"]


class UpdateUserActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAction
        fields = [ "type", "data"]

class UserActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAction
        fields = '__all__'


class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField()


class SendEmailEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SendEmailEvent
        exclude = ['id']


class ShortURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortURL
        fields = '__all__'
