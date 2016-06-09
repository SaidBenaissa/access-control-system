#!/usr/bin/env python
# -*- coding: utf-8 -*-

import threading
import time
import nfc
import subprocess

import sys

from adminapp.models import sendMessage


class nfcThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        #context = nfc.init()
        #self.pnd = nfc.open(context)
        #if self.pnd is None:
        #    print('ERROR: Unable to open NFC device.')
        #    exit()
#
        #if nfc.initiator_init(self.pnd) < 0:
        #    nfc.perror(self.pnd, "nfc_initiator_init")
        #    print('ERROR: Unable to init NFC device.')
        #    exit()
        #print('NFC device is initialized')
        self.state = 0

    def runProcess(self):
        p = subprocess.Popen(['/home/pi/Desktop/quick_start_example1'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        while (True):
            retcode = p.poll()  # returns None while subprocess is running
            line = p.stdout.readline()
            yield line
            if (retcode is not None):
                break

    def run(self):
        print("NFC reader started")
        print("NFC reader executing")

        for line in self.runProcess():
            print(line)
        #nmMifare = nfc.modulation()
        #nmMifare.nmt = nfc.    NMT_ISO14443A
        #nmMifare.nbr = nfc.NBR_106
#
        #nt = nfc.target()
        #while (True):
        #    ret = nfc.initiator_select_passive_target(self.pnd, nmMifare, 0, 0, nt)
        #    print('The following (NFC) ISO14443A tag was found:')
        #    print('    ATQA (SENS_RES): ', end='')
        #    nfc.print_hex(nt.nti.nai.abtAtqa, 2)
        #    id = 1
        #    if nt.nti.nai.abtUid[0] == 8:
        #        id = 3
        #    print('       UID (NFCID%d): ' % id, end='')
        #    print(''.join(format(x, '02x') for x in nt.nti.nai.abtUid))
        #    sendMessage(''.join(format(x, '02x') for x in nt.nti.nai.abtUid))
        #    nfc.print_hex(nt.nti.nai.abtUid, nt.nti.nai.szUidLen)
        #    print('      SAK (SEL_RES): ', end='')
        #    print(nt.nti.nai.btSak)
        #    if nt.nti.nai.szAtsLen:
        #        print('          ATS (ATR): ', end='')
        #        nfc.print_hex(nt.nti.nai.abtAts, nt.nti.nai.szAtsLen)
        #    subprocess.call(['/home/pi/power_measurements_skirpts/turn_off_on.sh', str(self.state)])
        #    if (self.state == 0):
        #        self.state = 1
        #    else:
        #        self.state = 0
        #    time.sleep(5)
