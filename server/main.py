import os

from docs_handwriting_recognizer import create_app

# creating the flask application
app = create_app()

# importing necessary environmental variable
HOST = os.environ.get('FLASK_RUN_HOST', 'localhost')
PORT = os.environ.get('FLASK_RUN_PORT', 8080)

if __name__ == '__main__':
    # running the application
    app.run(host=HOST, port=PORT, debug=True)
