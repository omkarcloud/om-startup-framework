"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from backend.views import url_shortener
from .views import downloads

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('backend/', include('backend.urls')),
    path('l/<str:code>/', url_shortener.redirect_short_url,  name='redirect_short_url'),
    path('downloads/<str:filename>', downloads.download_file, name='download_file'),
    path('__debug__/', include('debug_toolbar.urls')),
]
