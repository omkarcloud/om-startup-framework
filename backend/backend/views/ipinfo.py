from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.utils.ipinfo import get_client_ip, get_ipinfo_data

@api_view(['GET'])
def get_ipinfo(request):
    ip = request.query_params.get("ip") if request.query_params.get("ip") is not None else get_client_ip(request)
    
    ip_data = get_ipinfo_data(ip)
    return Response(ip_data)