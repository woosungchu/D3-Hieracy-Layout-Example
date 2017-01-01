from flask import Flask, render_template
import os
app = Flask(__name__)

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT,'static/')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<file>')
def example(file):
    return render_template(file)

@app.route('/layout/<file>')
def seq(file):
    return render_template('layout/'+file)

if __name__ == '__main__':
    app.run()
