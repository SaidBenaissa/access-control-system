from django.conf.urls import url
from adminapp import views
from adminapp.Test import RestrictedView

urlpatterns = [
    # url(r'^$', views.index, name='index'),
    # url(r'^login$', views.login, name='login'),
    url(r'^barsco$', views.barsco, name='barsco'),
    url(r'^restricted/$', RestrictedView.as_view()),
    # url(r'^$', views.index, name='index'),
    # url(r'^test/(?P<id>[a-zA-Z0-9]+)$', views.testik, name='testik')
]
