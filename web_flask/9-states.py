#!/usr/bin/python3
"""
that starts a Flask web application
"""


from flask import Flask, render_template
from models import *
from models import storage
app = Flask(__name__)


@app.route("/states", strict_slashes=False)
@app.route("/states/<state_id>", strict_slashes=False)
def states(state_id=None):
    """
    display the states and cities listed in alphabetical order
    """
    states = storage.all("State")
    if state_id is not None:
        state_id = 'State.' + state_id
    return render_template("7-states_list.html", states=states, state_id=state_id)

@app.teardown_appcontext
def teardown_db():
    """ close the storage on teardown """
    storeage.close()
