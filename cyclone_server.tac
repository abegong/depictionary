import os
from twisted.application import service, internet
from twisted.web import static, server

import cyclone.web
import cyclone.httpserver

import json
import random 

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

class HtmlHandler(cyclone.web.RequestHandler):
    def get(self):
        self.render('depictionary.html')

class JsonHandler(cyclone.web.RequestHandler):
    def get(self):
        words = ["acres","adult","advice","arrangement","attempt","August","Autumn","border","breeze","brick","calm","canal","Casey","cast","chose","claws","coach","constantly","contrast","cookies","customs","damage","Danny","deeply","depth","discussion","doll","donkey","Egypt","Ellen","essential","exchange","exist","explanation","facing","film","finest","fireplace","floating","folks","fort","garage","grabbed","grandmother","habit","happily","Harry","heading","hunter","Illinois","image","independent","instant","January","kids","label","Lee","lungs","manufacturing","Martin","mathematics","melted","memory","mill","mission","monkey","Mount","mysterious","neighborhood","Norway","nuts","occasionally","official","ourselves","palace","Pennsylvania","Philadelphia","plates","poetry","policeman","positive","possibly","practical","pride","promised","recall","relationship","remarkable","require","rhyme","rocky","rubbed","rush","sale","satellites","satisfied","scared","selection","shake","shaking","shallow","shout","silly","simplest","slight","slip","slope","soap","solar","species","spin","stiff","swung","tales","thumb","tobacco","toy","trap","treated","tune","University","vapor","vessels","wealth","wolf","zoo"]
        random.shuffle(words)
        result = {
            "words" : words[:8]
        }
        self.write(json.dumps(result, indent=2))


class JsonpHandler(cyclone.web.RequestHandler):
    '''Usage: /jsonp?theme=ninja'''

    def get(self):
        word = self.get_argument('theme')
        wiki_query = 'http://en.wikipedia.org/w/api.php?action=parse&page='+word+'&prop=text|links&format=json&callback=parseWikiJson'
        result = '''
<html>
<head>
    <script type="text/javascript">
function parseWikiJson(data){
  console.log(data);
  console.log(data.parse.text['*'].length);
}
    </script>
    <script type="text/javascript" src="'''+wiki_query+'''"></script>
</head>
<body></body>
</html>'''
#        '<script type="text/javascript" src="http://server2.example.com/RetrieveUser?UserId=1234&jsonp=parseResponse"></script>'
        self.write(result)

class Application(cyclone.web.Application):
    def __init__(self):
        handlers = [
            (r"/", HtmlHandler),
#            (r"/", RedirectHandler, {'url':'/home'}),
            (r"/jsonp/?", JsonpHandler),
            (r"/ajax/load-words/?", JsonHandler),
#            (r"/(.*?)/?", OpenTemplateHandler),
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

