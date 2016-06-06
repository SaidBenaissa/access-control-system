from django.db import models
from djwebsockets.decorator import Namespace
from djwebsockets.websocket import BaseWSClass

from django.contrib.auth.models import (
    AbstractBaseUser
)


class MyUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    date_of_birth = models.DateField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['date_of_birth']

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):  # __unicode__ on Python 2
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Socket(models.Model):
    id = models.AutoField(primary_key=True)
    socket_id = models.CharField(max_length=100)
    name = models.CharField(max_length=256)
    color = models.IntegerField(default=1)


class Card(models.Model):
    id = models.AutoField(primary_key=True)
    chip_id = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    user_id = models.ForeignKey(MyUser)


class Permissions():
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(MyUser)
    socket_id = models.ForeignKey(Socket)
    has_permission = models.BooleanField(default=True)


@Namespace("/")
class WebSocketHandler(BaseWSClass):
    @classmethod
    def on_connect(cls, websocket, path):
        print("uto", websocket, path)

    @classmethod
    def on_message(cls, websocket, message):
        print(cls, websocket, message)
        websocket.send('aa')

    @classmethod
    def on_close(cls, websocket):
        ...
