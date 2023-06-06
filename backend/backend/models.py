import datetime
import json
import random
import string
import django
from django.db import models
from django.utils import timezone
from backend.utils.hash_password import check_password


class Timestamps(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Token(Timestamps):
    token = models.CharField(max_length=100, unique=True)
    data = models.TextField()

    def is_expired(self):
        three_hours_from_creation = (
            self.created_at + datetime.timedelta(hours=3))

        return three_hours_from_creation < timezone.now()

    class Meta:
        abstract = True


class SignUpToken(Token):
    pass


class ResetPasswordToken(Token):
    pass

def generate_referral_code(length=3):
                while True:
                    # Generate a random alphanumeric string
                    letters = string.ascii_lowercase
                    code = ''.join(random.choice(letters) for _ in range(length))
                    
                    try:
                        not_has_duplicate = not User.objects.filter(referral_code=code).exists()
                        if not_has_duplicate:
                            return code
                    except django.db.utils.OperationalError:
                      return code

class User(Timestamps):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100,  blank=True)
    auth_method = models.CharField(max_length=20)
    email_auth_method = 'email'
    google_auth_method = 'google'


    is_banned = models.BooleanField(default=False)
    company_name = models.CharField(max_length=255, blank=True, default='')
    provides_service = models.CharField(max_length=255, blank=True, default='')
    employee_size = models.CharField(max_length=255, blank=True, default='')
    phone_number = models.CharField(max_length=20, blank=True, default='')
    country = models.CharField(max_length=255, blank=True, default='')
    has_on_boarded = models.BooleanField(default=False)

    first_referrer = models.CharField(max_length=512, blank=True, default='')
    first_url_params = models.JSONField(default=dict)

    pending_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    referral_link_clicks = models.IntegerField(default=0)
    referral_code = models.CharField(max_length=12,
                                      unique=True,
                                      default=generate_referral_code)
    
    referred_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    def check_password(self, plain_text_password):
        return check_password(plain_text_password, self.password)

    def has_paid(self):
        # todo implement
        return False

class UserAction(Timestamps):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='actions', null=True)
    type = models.CharField(max_length=255)
    data = models.JSONField()
    ip = models.CharField(max_length=255)
    user_agent = models.CharField(max_length=512, null=True)

    type_onboarded = 'onboarded'
    type_short_url_click = 'short_url_click'
    file_download = 'file_download'
    type_exception = 'exception'
    type_visit = 'visit'
    type_referraljoin = 'referraljoin'
    type_signup = 'signup'
    type_signin = 'signin'
    type_signout = 'signout'
    type_resetpassword = 'resetpassword'
    
    def get_action_display(self):
        result = None
        
        created_at_str = self.created_at.strftime("%a %d %b %Y %H:%M")
        data = self.data

        if self.type == self.type_onboarded:
            result = f'{created_at_str}: User Onboarded'
        elif self.type == self.type_referraljoin:
            refeeral_name = data.get('name')
            result = f'{created_at_str}: User joined via referral of {refeeral_name}'
        elif self.type == self.type_visit:
            path = data.get('path')
            referrer = data.get('referrer')
            result = f'{created_at_str}: User visited {path}' + ((f' via {referrer}') if referrer != '' else '')
        elif self.type == self.type_short_url_click:
            short_url = data.get('short_url')
            original_url = data.get('original_url')
            result = f'{created_at_str}: User clicked short url yourdomain.com/l/{short_url}/ to visit {original_url}'
        elif self.type == self.type_signup:
            result = f'{created_at_str}: User Signed Up'
        elif self.type == self.type_signin:
            result = f'{created_at_str}: User Signed In'
        elif self.type == self.type_signout:
            result = f'{created_at_str}: User Signed Out'
        elif self.type == self.type_resetpassword:
            result = f'{created_at_str}: User Reset Password'
        else:
            text_content = json.dumps(data, indent=4)
            result = f'{created_at_str}: User {self.type}\n{text_content}'

        return result
    
def delete_models_list(ls):
    for l in ls:
        l.delete()



class SendEmailEvent(Timestamps):
    subject = models.CharField(max_length=255,  blank=True)
    content = models.JSONField()



class ShortURL(Timestamps):
    original_url = models.URLField()
    short_url = models.CharField(max_length=100, unique=True)
    click_count = models.PositiveIntegerField(default=0)
    note = models.TextField(blank=True)

