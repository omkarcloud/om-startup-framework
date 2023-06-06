from django.test import TestCase

from backend.validators import is_company_email

class ApiTestCase(TestCase):
    def test_temporary_email(self):
        self.assertFalse(is_company_email('john.doe@mailinator.com'))

    def test_gmail(self):
        self.assertFalse(is_company_email('john.doe@gmail.com'))

    def test_free_domain(self):
        self.assertFalse(is_company_email('john.doe@freespam.com'))

    def test_free_domain_2(self):
        self.assertFalse(is_company_email('john.doe@xyz.tk'))

    def test_free_domain_3(self):
        self.assertFalse(is_company_email('john.doe@xyz.cu.cc'))

    def test_company_email(self):
        self.assertTrue(is_company_email('john.doe@google.com'))
