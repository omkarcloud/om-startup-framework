from django.test import TestCase
from backend.models import User, SignUpToken, ResetPasswordToken
from backend.messages import Messages

class ApiTestCase(TestCase):
    valid_user = {
        "name": "a",
        "email": "a@gmail.com",
        "password": "qwer14586s",
    }

    def create_user(self):
        sign_up_response = self.client.post(
            "/backend/auth/sign-up/", self.valid_user)
        token = SignUpToken.objects.get(pk=1)
        response = self.client.get(
            f'/backend/auth/sign-up-email-verify/{token.token}/')
        return response

    def test_sign_up(self):
        response = self.create_user()
        self.assertEqual(response.url, '/')
        user = User.objects.get(pk=1)
        self.assertEqual(user.name, self.valid_user["name"])
