from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request):
    return Response({
        "status": "Vyomveda Core Django API Live",
        "version": "1.0.0",
        "endpoints": ["/admin", "/api/auth", "/api/space-data"]
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root),
    # Future auth and data endpoints will be registered here
]
