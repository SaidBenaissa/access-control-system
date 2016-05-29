from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.views.decorators.gzip import gzip_page
from django.views.decorators.http import require_GET
from rest_framework.renderers import JSONRenderer


def index(request):
    return JSONRenderer().render({'a': 'aaa'})
    return HttpResponse("som na indexe")
    return TemplateResponse(request, 'home.html')
    # return HttpResponse("Hello, world. You're at the adminapp index.")


def login(request):
    # from django.contrib.auth import authenticate
    # user = authenticate(username='', password='')
    # if user is not None:
    #     # the password verified for the user
    #     if user.is_active:
    #         print("User is valid, active and authenticated")
    #     else:
    #         print("The password is valid, but the account has been disabled!")
    # else:
    #     # the authentication system was unable to verify the username and password
    #     print("The username and password were incorrect.")
    return HttpResponse("Logiiiiin")


def barsco(request):
    # from django.contrib.auth import authenticate
    # user = authenticate(username='', password='')
    # if user is not None:
    #     # the password verified for the user
    #     if user.is_active:
    #         print("User is valid, active and authenticated")
    #     else:
    #         print("The password is valid, but the account has been disabled!")
    # else:
    #     # the authentication system was unable to verify the username and password
    #     print("The username and password were incorrect.")
    return HttpResponse("barsco")


@require_GET
@gzip_page
def testik(request, id):
    return HttpResponse(id)
