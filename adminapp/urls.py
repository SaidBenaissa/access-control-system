from django.conf.urls import url

from adminapp import views

urlpatterns = [
    url(r'^login$', views.login, name='login'),
    url(r'^$', views.index, name='index'),
]
