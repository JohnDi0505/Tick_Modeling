import cherrypy
from os.path import abspath

def app():
    return file("static/index.html")
app.exposed = True

conf = {
    
    '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': abspath('./static') # staticdir needs an absolute path
            }
        }

if __name__ == '__main__':
    cherrypy.quickstart(app, '/', conf)
