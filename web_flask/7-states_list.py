#!/usr/bin/python3
"""
that starts a Flask web application
"""


from flask import Flask, render_template
from models import *
from models import storage
app = Flask(__name__)


@app.route("/states_list", strict_slashes=False)
def states_list():
    """
    display a HTML page: (inside the tag BODY)
    H1 tag: “States”
    UL tag: with the list of all State objects present in DBStorage sorted by name
    LI tag: description of one State: <state.id>: <B><state.name></B>
    """
    states = sorted(list(storage.all("State").values()), key= lambda x: x.name)
    return render_template("7-states_list.html", states=states)

@app.teardown_appcontext
def teardown_db():
    """ close the storage on teardown """
    storeage.close()
