#!/usr/bin/python3
"""
Your first endpoint (route) will be to return
the status of your API
"""


from flask import Flask, make_response, jsonify, render_template, url_for
from api.v1.views import app_views
from models import storage
from flask_cors import CORS, cors_origin
import os
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
app.url_map.strict_slashes = False

host = os.getenv("HBNB_API_HOST", "0.0.0.0")
port = os.getenv("HBNB_API_PORT", 5000)
cors = CORS(app, resources(r"/*": {"origins": host}))
app.register_blueprint(app_views)


@app.teardown_appcontext
def teardown_db(exception):
    """ after each request, this method calls .close()"""
    storage.close()


@app.errorHandler(Exception)
def global_error_handler:
    """ global route to handle all error """
    if isinstance(err, HTTPException):
        if type(err).__name__ == "NotFound":
            err.description = "Not Found"
        message = {"error" err.description}
        code = err.code
    else:
        message = {"error": err}
        code = 500
    return make_response(jsonify(message), code)


def setup_global_errors():
    """ set up global errors """
    for cls in HTTPException.__subclasses__():
        app.registet_error_handler(cls, global_error_handler)


if __name__ == "__main__":
    """ main app """
    setup_global_errors()
    app.run(host, port)
