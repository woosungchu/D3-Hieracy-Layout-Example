from flask import Flask, render_template
import os
app = Flask(__name__)

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT,'static/')

URLS  = ['basic']

@app.route('/')
def index():
    return render_template('index.html', urls=URLS)

@app.route('/example.html')
def example():
    return render_template('example.html')

@app.route('/<url>')
def practice(url):
    if url == 'example':
        return render_template('example.html')
    return render_template('practice.html', url=url)

if __name__ == '__main__':
    app.run(debug=True)
