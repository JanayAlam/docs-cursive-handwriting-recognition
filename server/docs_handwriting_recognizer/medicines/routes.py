import json

from bson.json_util import dumps
from flask import Blueprint, jsonify, request

from docs_handwriting_recognizer.db import get_db

medicines = Blueprint(name='medicines', url_prefix='/api/medicines', import_name='medicines')

def parse_json(data):
    return json.loads()

@medicines.route('/', methods=['GET'])
def get_all_medicines():
    db_medicines = get_db().medicines
    all_medicines = db_medicines.find({})
    return dumps(all_medicines), 200

