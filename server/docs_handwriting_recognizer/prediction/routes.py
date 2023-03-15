import re

import numpy as np
import tensorflow as tf
from flask import Blueprint, jsonify, request
from PIL import Image

from docs_handwriting_recognizer.db import get_db

predict = Blueprint(
    name='predict', url_prefix='/api/predict', import_name='predict')

# Load the saved model
model = tf.keras.models.load_model('./save_models/model_3.h5')


def get_payload(data):
    return {
        'name': data.get('name'),
        'category': data.get('category'),
        'generic': data.get('generic'),
        'strength': data.get('strength'),
        'company': data.get('company'),
        'price': data.get('price')
    }


def get_alternate_brands(db_medicines, medicine):
    generic_name = medicine['generic']
    alternate_medicines = db_medicines.find(
        {'generic': generic_name, 'strength': medicine['strength']})
    filtered_medicines = []

    for med in list(alternate_medicines):
        query_1 = medicine['company'] != med['company']
        query_2 = medicine['name'] != med['name']
        query_3 = medicine['price'] - \
            0.5 <= med['price'] <= medicine['price']+0.5
        if query_1 and query_2:
            filtered_medicines.append(med)
    return [get_payload(data) for data in filtered_medicines[:10]]


def img_predict(img):
    class_names = [
        'Tab. Afenac 50mg',
        'Tab. Calcin D',
        'Tab. Finix 20mg',
        'Tab. Fixal 120mg',
        'Tab. Napa Extend 665mg',
        'Tab. Naprosyn 500mg',
        'Tab. Napsod 550mg',
        'Tab. Nitrin SR 2.6mg',
        'Tab. Osartil 100mg',
        'Tab. Ovocal-DX',
        'Tab. Ramoril 5mg',
        'Tab. Resva 5mg',
        'Tab. Rivotril 0.5mg',
        'Tab. Riz 10mg',
        'Tab. V-Plex'
    ]

    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = model.predict(img_array)

    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)
    return predicted_class, confidence


@predict.route('/', methods=['POST'])
def prediction():
    db_medicines = get_db().medicines

    requested_photos = request.files
    photos = []
    returned_value = []

    for r_img in requested_photos:
        photos.append({
            'id': request.files[r_img].filename,
            'arr': np.array(Image.open(request.files[r_img]).convert("RGB").resize((256, 72))) / 255
        })

    for i in range(len(photos)):
        label, confidence = img_predict(photos[i]['arr'])
        # t = label.split('.')
        # if len(t)>2:
        #     t =  '.'.join(t[1:])
        # else:
        #     t = t[1]
        
        # temp = t.strip()

        # temp_arr = temp.split(' ')
        
        # print(i, temp_arr)

        # # if len(temp_arr) > 3:
        # #     name = ' '.join(temp_arr[:-1]).strip()
        # #     s = temp_arr[-1]
        # #     si = s.find('m')
        # #     strength = temp_arr[-1][:si] + ' ' + temp_arr[-1][si:] if si != -1 else None
        # if len(temp_arr) > 1:
        #     if 'mg' in temp_arr[-1]:
        #         s = temp_arr[-1]
        #         si = s.find('m')
        #         strength = temp_arr[-1][:si] + ' ' + temp_arr[-1][si:] if si != -1 else None
        #     name = ' '.join(temp_arr).strip()
        #     print('INSIDE', name)
        # else:
        #     name = temp_arr[0].strip()
        #     strength = None

        if 'Afenac' in label:
            name = 'A-Fenac'
            strength = '50 mg'
        elif 'Calcin' in label:
            name = 'Calcin-D'
            strength = None
        elif 'Finix' in label:
            name = 'Finix'
            strength = '20 mg'
        elif 'Fixal' in label:
            name = 'Fixal'
            strength = '120 mg'
        elif 'Napa' in label:
            name = 'Napa Extend'
            strength = '665 mg'
        elif 'Naprosyn' in label:
            name = 'Naprosyn'
            strength = '500 mg'
        elif 'Napsod' in label:
            name = 'Napsod'
            strength = '550 mg'
        elif 'Nitrin' in label:
            name = 'Nitrin SR'
            strength = '2.6 mg'
        elif 'Osartil' in label:
            name = 'Osartil'
            strength = '100 mg'
        elif 'Ovocal-DX' in label:
            name = 'Ovocal-DX'
            strength = None
        elif 'Ramoril' in label:
            name = 'Ramoril'
            strength = '5 mg'
        elif 'Resva' in label:
            name = 'Resva'
            strength = '5 mg'
        elif 'Rivotril' in label:
            name = 'Rivotril'
            strength = '0.5 mg'
        elif 'Riz' in label:
            name = 'Riz'
            strength = '10 mg'
        elif 'V-Plex' in label:
            name = 'V-Plex'
            strength = None
        else:
            name = None
            strength = None

        medicine = None
        alt_brands = []
        if strength:
            # idx = strength.find('m')
            # strength = strength[:idx] + ' ' + strength[idx:]
            medicine = db_medicines.find_one(
                {'name': name, 'strength': strength})
        else:
            medicine = db_medicines.find_one({'name': name})
        if medicine:
            alt_brands = get_alternate_brands(db_medicines, medicine) if medicine else []
        
        returned_value.append({
            'id': photos[i]['id'],
            'label': label,
            'medicine': get_payload(medicine) if medicine else {'name': 'N/A', 'generic': 'N/A', 'strength': 'N/A', 'price': 'N/A', 'company': 'N/A', 'category': 'N/A', 'id': 'N/A'},
            'confidence': confidence,
            'alternative_brands': alt_brands,
        })

    return jsonify(returned_value), 200
