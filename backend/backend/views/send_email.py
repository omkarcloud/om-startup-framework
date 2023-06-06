from backend.views.auth import get_first_name
from backend.models import *
from backend.serializers import *
from rest_framework.viewsets import ModelViewSet
from backend.utils.data import ONLY_POST_METHOD
from backend.utils.email_templates import *

demo_interest_subject = "Demo Interest"
discount_interest_subject = "Discount Interest"
inquiry_interest_subject = "Inquiry Interest"
buy_interest_subject = "Buy Interest"
contactus_subject = "Contact Us"
linkedin_interest_email = 'Get Phone by LinkedIn Profile'

class SendEmailEventViewSet(ModelViewSet):
    http_method_names = ONLY_POST_METHOD
    serializer_class = SendEmailEventSerializer
    queryset = SendEmailEvent.objects.all()

    def perform_create(self, serializer):
        subject = serializer.validated_data['subject']
        content = serializer.validated_data['content']
        
        send_generic_email(subject, content)
        serializer.save()

        name = content['name']
        fname = get_first_name(name)
        email = content['email']

        if subject == demo_interest_subject:
            send_user_email(fname, email , "Thank you for your Demo Interest" , "mail_demo_interest.html")
        elif subject == discount_interest_subject:
            send_user_email(fname, email , "Thank you for your Discount Interest" , "mail_discount_interest.html")
        elif subject == inquiry_interest_subject:
            send_user_email(fname, email , "Thank you for your Inquiry" , "mail_inquiry_interest.html")
        elif subject == buy_interest_subject:
            send_user_email(fname, email , "Thank you for your Buying Interest" , "mail_buy_interest.html")
        elif subject == contactus_subject:
            send_user_email(fname, email , "Thank you for Contacting Us" , "mail_contact_us.html")
        