import os
from twisted.application import service, internet
from twisted.web import static, server

import cyclone.web
import cyclone.httpserver

try:
    _port = int(os.environ["PORT"])
except:
    _port = 80

class RedirectHandler(cyclone.web.RequestHandler):
    def initialize(self, url):
        self.url = url

    def get(self):
        self.redirect(self.url)

class OpenTemplateHandler(cyclone.web.RequestHandler):
    def get(self, path):
        self.render(path+'.html')

class Application(cyclone.web.Application):
    def __init__(self):
        handlers = [
            (r"/", RedirectHandler, {'url':'/home'}),
            (r"/(.*?)/?", OpenTemplateHandler),
        ]
        
        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), "html"),
            static_path=os.path.join(os.path.dirname(__file__), "html"),
            debug=True,
            autoescape=None,
#            login_url="/sign-in",
            cookie_secret="lRkzXk/nSmiAw/r0ZVrPAv5Di/Cr1Udep7TRY/pi56w=",
            )

        cyclone.web.Application.__init__(self, handlers, **settings)

#        self.db = MongoDatabase()


site = Application()
application = service.Application("Depictionary")
internet.TCPServer(_port, site).setServiceParent(application)


