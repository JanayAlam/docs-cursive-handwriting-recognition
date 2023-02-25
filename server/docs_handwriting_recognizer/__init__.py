from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

from werkzeug.exceptions import NotFound

load_dotenv()


def create_app():
    # initializing flask application
    app = Flask(__name__)

    # allowing all origins for all routes
    CORS(app, resources={r'/api/*': {'origins': '*'}})

    @app.route('/health')
    def health():
        return {}, 200

    # importing blueprints
    from docs_handwriting_recognizer.prediction.routes import predict

    # registering all blueprints
    app.register_blueprint(predict)

    @app.errorhandler(404)
    def not_found_error_handler(error: NotFound):
        return jsonify({
            'name': error.name,
            'message': error.description
        }), error.code

    # exporting the application
    return app