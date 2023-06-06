from django.db.utils import OperationalError

from backend.utils.ipinfo import get_client_ip
from backend.models import UserAction
from backend.utils.exceptions import CustomException
from backend.models import User


def get_user(id):
    try:
        u = User.objects.get(id=id)
        return u
    except User.DoesNotExist:
        raise CustomException("User does not exist")

def safe_save(user_action):
    # Weak Database Fix
    try:
        user_action.save()
    except OperationalError as e:
        print("Failed")
        pass

def get_current_user(request):
        return get_user(request.user_id)




def save_action(request, type, data, user = None):
    def get_doer():
        if  user is not None:
            return user
        if request.user_id is not None:
            return get_current_user(request)
        return None

    user_agent = request.META.get('HTTP_USER_AGENT')

    
    action = type
    data = data
    doer = get_doer()

    user_action = UserAction(user=doer, user_agent=user_agent, data=data, type=action, ip=get_client_ip(request))
    safe_save(user_action)