from backend.models import UserAction, User
from backend.permissions import IsAdmin, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def get_stats(request):

        date_param = request.data.get('date', str(datetime.date.today()))

        # Convert the date parameter to a date object
        try:
            date_filter = datetime.date.fromisoformat(date_param)
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)

        # Filter users by their registration date which is equal to the date filter
        new_users = User.objects.filter(created_at__lte=date_filter + datetime.timedelta(days=1), created_at__gte=date_filter)

        # Filter user actions by their timestamp which is equal to the date filter
        user_actions = UserAction.objects.filter(created_at__lte=date_filter + datetime.timedelta(days=1), created_at__gte=date_filter)

        # Count distinct users from the filtered user actions
        active_today = user_actions.values('user').distinct().count()

        # Prepare the response data
        data = {
            'new_users': new_users.count(),
            'active_today_users': active_today
        }
        
        return Response(data)
