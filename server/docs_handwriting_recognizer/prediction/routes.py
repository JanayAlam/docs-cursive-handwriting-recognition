import numpy as np
import tensorflow as tf
from docs_handwriting_recognizer.db import get_db
from flask import Blueprint, jsonify, request
from PIL import Image

predict = Blueprint(
    name='predict', url_prefix='/api/predict', import_name='predict')

# Load the saved model
model = tf.keras.models.load_model('./save_models/model_2.h5')


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
        name = label.split('.')[1].strip().split(' ')[0]
        medicine = db_medicines.find_one({'name': name})
        alt_brands = get_alternate_brands(db_medicines, medicine) if medicine else []
        returned_value.append({
            'id': photos[i]['id'],
            'label': label,
            'medicine': get_payload(medicine),
            'confidence': confidence,
            'alternative_brands': alt_brands,
        })
    
    return jsonify(returned_value), 200
