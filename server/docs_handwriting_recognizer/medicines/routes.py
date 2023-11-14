import math

from bson.json_util import dumps
from docs_handwriting_recognizer.db import get_db
from flask import Blueprint, jsonify, request
from flask_pymongo import pymongo

medicines = Blueprint(
    name='medicines', url_prefix='/api/medicines', import_name='medicines')


@medicines.route('/', methods=['GET'])
def get_all_medicines():
    db_medicines = get_db().medicines

    limit = request.args.get('limit')
    offset = request.args.get('offset')

    limit = int(limit) if limit else 10

    if request.args.get('page'):
        offset = int(request.args.get('page')) * limit
    else:
        offset = int(offset) if offset else 0

    starting_id = db_medicines.find().sort(
        '_id', pymongo.ASCENDING)
    last_id = starting_id[offset]['_id']

    current_page = math.ceil(offset / limit)
    total_page = math.ceil(len(list(starting_id)) / limit)

    all_medicines = db_medicines.find({'_id': {'$gte': last_id}}).sort(
        '_id', pymongo.ASCENDING).limit(limit)

    output = []
    for i in all_medicines:
        i['_id'] = str(i['_id'])
        output.append(i)

    prev_url = f'/api/medicines?limit={limit}&offset={offset-limit}'
    next_url = f'/api/medicines?limit={limit}&offset={offset+limit}'

    return {'result': output, 'prev_url': prev_url, 'next_url': next_url, 'total_page': total_page, 'current_page': current_page}, 200
