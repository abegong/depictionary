# Example: loops monitoring events forever.
import re, os
from pyinotify import WatchManager, IN_DELETE, IN_CREATE, IN_CLOSE_WRITE, ProcessEvent, Notifier
import subprocess

class Process(ProcessEvent):
    def __init__(self, script, regex='.*'):
        self.script = script
        self.regex = re.compile(regex)

    def process_IN_CREATE(self, event):
        if self.match_event( event ):
            self.run_kill_script()

    def process_IN_DELETE(self, event):
        if self.match_event( event ):
            self.run_kill_script()

    def process_IN_CLOSE_WRITE(self, event):
        if self.match_event( event ):
            self.run_kill_script()

    def match_event(self, event):
        target = os.path.join(event.path, event.name)
        match = self.regex.match(target)
#        print target, match
        return match

    def run_kill_script(self):
        print '<'*30 + '[  Restarting twistd  ]' + '>'*30
        print ' ' + self.script
#        subprocess.Popen(self.script, stdout=subprocess.PIPE, shell=True)#.stdout.read()
        subprocess.Popen(self.script, shell=True)

# Instanciate a new WatchManager (will be used to store watches).
wm = WatchManager()

# Associate this WatchManager with a Notifier (will be used to report and process events).
notifier = Notifier(wm)

# Add a new watch on /tmp for ALL_EVENTS.
mask = IN_DELETE | IN_CREATE | IN_CLOSE_WRITE
wm.add_watch('.', mask)


subprocess.Popen("twistd -ny cyclone_server.tac", shell=True)

# Loop forever and handle events.
while True:
    wm = WatchManager()
    process = Process('sudo bash twistd-restart.sh', '(\.|handlers)/(.*?)\.(py|tac)$')
    notifier = Notifier(wm, process)
    mask = IN_DELETE | IN_CREATE | IN_CLOSE_WRITE
    wdd = wm.add_watch('.', mask, rec=True)
    try:
        while True:
            notifier.process_events()
            if notifier.check_events():
                notifier.read_events()
    except KeyboardInterrupt:
        notifier.stop()
        break


