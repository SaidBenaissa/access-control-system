from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.views.decorators.gzip import gzip_page
from django.views.decorators.http import require_GET
from rest_framework.decorators import renderer_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework_jwt.views import verify_jwt_token

from adminapp.models import Socket
from adminapp.serializers import SocketSerializer


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


@api_view(['POST'])
@renderer_classes((JSONRenderer,))
def barsco(request):
    s = Socket(socket_id=request.data.get('socket_id'), name=request.data.get('name'), color=request.data.get('color'))
    s.save()
    return Response(Socket.objects.all())


@require_GET
@gzip_page
def testik(request, id):
    return HttpResponse(id)
