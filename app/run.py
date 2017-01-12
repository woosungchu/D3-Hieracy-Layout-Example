from flask import Flask, render_template
import os
app = Flask(__name__)

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT,'static/')

URLS  = ['basic','selections','datajoins','enterexit','marybartlett','d3noob'
        ,'hierarchy', 'treemap','treeclustertransition','radialtree']

@app.route('/')
def index():
    return render_template('index.html', urls=URLS)

@app.route('/<url>')
def practice(url):
    if url == 'example.html':
        return render_template('example.html')

    #static
    elif url.endswith('.csv'):
        return app.send_static_file(url)

    return render_template('practice.html', url=url)

if __name__ == '__main__':
    app.debug = True;
    app.port = int(os.environ.get('PORT', 5000));
    app.host='0.0.0.0';
    app.run()
