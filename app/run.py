from flask import Flask, render_template
import os
app = Flask(__name__)

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT,'static/')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/app/<seq>')
def seq(seq):
    return render_template(seq+'.html')

if __name__ == '__main__':
    app.run()
