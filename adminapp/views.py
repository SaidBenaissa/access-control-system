from django.http import HttpResponse
from django.views.decorators.gzip import gzip_page
from django.views.decorators.http import require_GET
from rest_framework.decorators import renderer_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from adminapp.models import Socket


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
