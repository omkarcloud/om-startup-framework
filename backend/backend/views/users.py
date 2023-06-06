from backend.utils.model_utils import get_user
from backend.utils.model_utils import get_current_user
from backend.models import *
from backend.pagination import DefaultPageNumberPagination
from backend.permissions import IsAdmin, IsAuthenticated
from backend.serializers import *
from rest_framework.viewsets import ModelViewSet,ViewSet
from backend.utils.email_templates import *
from rest_framework import filters
from django_filters.rest_framework import FilterSet, DateFilter, DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from backend.utils.ipinfo import get_client_ip, get_ipinfo_data
from backend.utils.utils import download_csv_response
from backend.views.auth import get_first_name
from django.db.models import Max, Count,Q
from backend.utils.model_utils import save_action
import datetime

ONLY_GET_PATCH_DELETE = ['get', 'patch', 'delete', 'head', 'options']
ONLY_GET_POST = ['get', 'post', 'head', 'options']
ONLY_PATCH = ['patch', 'head', 'options']


class UserViewSet(ModelViewSet):
    http_method_names = ONLY_GET_PATCH_DELETE

    pagination_class = DefaultPageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email']
    permission_classes = [IsAuthenticated,  IsAdmin]

    def get_queryset(self):
        today = datetime.date.today() 
        return User.objects.annotate(
        total_actions=Count('actions'),
        actions_today=Count('actions', filter=Q(actions__created_at__gte=today)),
        last_action_date=Max('actions__created_at')).all()


    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = self.get_serializer(
            instance, data=request.data, partial=kwargs.pop('partial', False))
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AdminUserSerializer
        elif self.request.method == 'PATCH':
            return UpdateUserSerializer



class UserActionViewSet(ViewSet):
    permission_classes = [IsAuthenticated,  IsAdmin]

    def list(self, request, user_id):
        actions = UserAction.objects.filter(user=get_user(user_id))
        action_strings = [action.get_action_display() for action in actions]
        return Response(action_strings)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def download(request):
    serializer = UserSerializer(User.objects.all(), many=True)
    result = serializer.data

    return download_csv_response(result, list(result[0].keys()))

class UserOnboardingViewSet(ModelViewSet):
    http_method_names = ONLY_PATCH
    serializer_class = UpdateOnboardingUserSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        referral_code = self.request.data.get('referral_code')
        serializer.save()

        if referral_code:
            try:
                i = User.objects.get(id=self.request.user_id)
                referrer = User.objects.get(referral_code=referral_code)
                i.referred_by = referrer
                i.save()
                save_action(self.request, UserAction.type_referraljoin, {'name': referrer.name})

            except User.DoesNotExist:
                pass

        ip_data = get_ipinfo_data(get_client_ip(self.request))

        user = get_current_user(self.request)
        user.country = ip_data['country']
        user.save()

    def get_queryset(self):
        return User.objects.filter(id=self.request.user_id)


@api_view(['PATCH'])
def increment_referral_link_clicks(request, code):
    try:
        user = User.objects.get(referral_code=code)
        user.referral_link_clicks += 1
        user.save()
        return Response({'ok': True},)
    except User.DoesNotExist:
        return Response({'message': 'Referral code does not exist.'}, status=404)


@api_view(['GET'])
def get_first_name_by_referral_code(request, code):
    try:
        user = User.objects.get(referral_code=code)
        return Response({'first_name': get_first_name(user.name)},)
    except User.DoesNotExist:
        return Response({'message': 'Referral code does not exist.'}, status=404)



class ActionFilter(FilterSet):
    start_date = DateFilter(field_name="created_at",lookup_expr="gte")
    end_date = DateFilter(field_name="created_at",lookup_expr="lte")

    class Meta:
        model = UserAction
        fields = [
            "type",
            "start_date",
            "end_date",
        ]

class ActionViewSet(ModelViewSet):
    http_method_names = ONLY_GET_POST

    pagination_class = DefaultPageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class  = ActionFilter

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated(),  IsAdmin(), ]
        elif self.request.method == 'POST':
            return []
        else:
            return []

    def get_queryset(self):
        return UserAction.objects.all()

    def create(self, request, *args, **kwargs):
        save_action(request, request.data.get('type'), request.data.get('data'))
        return Response({'status': 'success'})

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserActionSerializer
        elif self.request.method == 'POST':
            return UpdateUserActionSerializer 