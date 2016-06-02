import threading
import time


class myThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.counter = 0

    def run(self):
        while (True):
            time.sleep(1)
            self.counter += 1
            print(self.counter)
