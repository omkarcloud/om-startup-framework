from backend.utils.model_utils import save_action
from backend.models import *
from backend.pagination import DefaultPageNumberPagination
from backend.permissions import IsAdmin, IsAuthenticated
from backend.serializers import *
from rest_framework.viewsets import ModelViewSet
from backend.utils.email_templates import *
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect

class ShortURLViewSet(ModelViewSet):
    queryset = ShortURL.objects.all()
    serializer_class = ShortURLSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = DefaultPageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['original_url', 'short_url']

@api_view(['GET'])
def redirect_short_url(request, code):
    try:
        short_url = ShortURL.objects.get(short_url=code)
        short_url.click_count += 1
        short_url.save()

        save_action(request, UserAction.type_short_url_click, {"short_url": code, "original_url": short_url.original_url})

        return redirect(short_url.original_url)
    except ShortURL.DoesNotExist:
        return Response({'message': 'Short URL does not exist.'}, status=404)