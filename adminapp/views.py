from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.views.decorators.gzip import gzip_page
from django.views.decorators.http import require_GET
from rest_framework.renderers import JSONRenderer
from rest_framework_jwt.views import verify_jwt_token


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
    verify_jwt_token
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
    return HttpResponse(verify_jwt_token)


@require_GET
@gzip_page
def testik(request, id):
    return HttpResponse(id)
