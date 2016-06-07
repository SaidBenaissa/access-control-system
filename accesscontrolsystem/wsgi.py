"""
WSGI config for accesscontrolsystem project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from scripts.quick_start_example import nfcThread

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "accesscontrolsystem.settings")

application = get_wsgi_application()

nfc = nfcThread()
nfc.daemon = True
nfc.start()
