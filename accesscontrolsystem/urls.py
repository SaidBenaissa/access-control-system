"""accesscontrolsystem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token

from adminapp import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/', include('adminapp.urls', namespace='rest_framework')),
    url(r'^api/api-token-auth', obtain_jwt_token),
    # url(r'^t/', include('adminapp.urls'))
    # url(r'^api-auth/', include('adminapp.urls', namespace='rest_framework'))
    # url(r'^adminapp/', include('adminapp.urls')),
    # url(r'^login/', include('adminapp.urls')),
    # url(r'^admin/', admin.site.urls),
]
