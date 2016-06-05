from rest_framework import serializers

from adminapp.models import Socket


class SocketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Socket
        fields = ('socket_id', 'name', 'color', 'id')
