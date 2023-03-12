import numpy as np
from flask import Blueprint, jsonify, request
from PIL import Image

from docs_handwriting_recognizer.db import get_db

predict = Blueprint(
    name='predict', url_prefix='/api/predict', import_name='predict')


def get_payload(data):
    return {
        'name': data.get('name'),
        'category': data.get('category'),
        'generic': data.get('generic'),
        'strength': data.get('strength'),
        'company': data.get('company'),
        'price': data.get('price')
    }


def get_alternate_brands(medicine):
    db_medicines = get_db().medicines

    generic_name = medicine['generic']
    alternate_medicines = db_medicines.find({'generic': generic_name})

    filtered_medicines = []

    for med in list(alternate_medicines):
        query_1 = medicine['strength'] == med['strength']
        query_2 = medicine['company'] != med['company']
        query_3 = medicine['name'] != med['name']
        query_4 = medicine['price'] - \
            0.5 <= med['price'] <= medicine['price']+0.5
        if query_1 and query_2 and query_3 and query_4:
            filtered_medicines.append(med)

    return [get_payload(data) for data in filtered_medicines]


@predict.route('/', methods=['POST'])
def prediction():
    requested_photos = request.files
    photos = []

    for r_img in requested_photos:
        photos.append({
            'id': request.files[r_img].filename,
            'arr': np.array(Image.open(request.files[r_img]).convert("L").resize((256, 72)))
        })

    label = 'Tab. Atova 20mg'

    db_medicines = get_db().medicines

    name = label.split('.')[1].strip().split(' ')[0]
    medicine = db_medicines.find_one({'name': name})

    return jsonify([
        {
            'id': photo['id'],
            'label': label,
            'alternate_brands': get_alternate_brands(medicine) if medicine else []
        } for photo in photos
    ]), 200
