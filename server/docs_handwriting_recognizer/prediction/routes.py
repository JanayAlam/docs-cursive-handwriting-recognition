import cv2
import numpy as np
import tensorflow as tf
from docs_handwriting_recognizer.db import get_db
from flask import Blueprint, jsonify, request
from PIL import Image
from scipy.stats import mode
from skimage.transform import hough_line, hough_line_peaks, rotate

predict = Blueprint(
    name='predict', url_prefix='/api/predict', import_name='predict')


# model = tf.keras.models.load_model('./save_models/model_fold_1.h5', compile=False)
model = tf.keras.models.load_model('./save_models/15_class.h5', compile=False)

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)


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
        if query_1 and query_2:
            filtered_medicines.append(med)
    return [get_payload(data) for data in filtered_medicines[:10]]


def get_sharp_img(edges):
    sharpen_filter = np.array([
        [0, -1, 0],
        [-1, 8, -1],
        [0, -1, 0],
    ])
    sharp_img = cv2.filter2D(edges, ddepth=-1, kernel=sharpen_filter)
    return sharp_img


def skew_angle_hough_transform(edges):
    # Classic straight-line Hough transform between 0.1 - 180 degrees.
    tested_angles = np.deg2rad(np.arange(0.1, 180.0))
    h, theta, d = hough_line(edges, theta=tested_angles)

    # find line peaks and angles
    _, angles, __ = hough_line_peaks(h, theta, d)

    # round the angles to 2 decimal places and find the most common angle.
    most_common_angle = mode(np.around(angles, decimals=2), keepdims=True)[0]

    # convert the angle to degree for rotation.
    skew_angle = np.rad2deg(most_common_angle - np.pi/2)

    if -10 > skew_angle[0] or skew_angle[0] > 10:
        skew_angle[0] = 0

    return skew_angle[0]


def remove_noise(img):
    return cv2.erode(img, kernel=(5, 5))


def preprocess(img):
    img = np.float32(img)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray_img = cv2.GaussianBlur(gray_img, ksize=(3, 3), sigmaX=1, sigmaY=1)
    edges = cv2.Laplacian(gray_img, ddepth=-1)

    sharp_img = get_sharp_img(edges)
    denoised_img = remove_noise(sharp_img)
    skew_angle = skew_angle_hough_transform(edges)
    rotated_img = rotate(denoised_img, skew_angle)
    return rotated_img


def img_predict(img):
    # class_names = ['Cap. PG 50mg', 'Cap. Sergel 20mg', 'Tab. Afenac 50mg', 'Tab. Calcin D', 'Tab. Coralex-DX',
    #                'Tab. Finix 20mg', 'Tab. Fixal 120mg', 'Tab. Napa Extend 665mg', 'Tab. Naprosyn 500mg',
    #                'Tab. Napryn 500mg', 'Tab. Napsod 550mg', 'Tab. Nitrin SR 2.6mg', 'Tab. Osartil 100mg',
    #                'Tab. Ovocal-DX', 'Tab. Povital', 'Tab. Ramoril 5mg', 'Tab. Relaxo 25mg', 'Tab. Resva 5mg',
    #                'Tab. Rivotril 0.5mg', 'Tab. Riz 10mg', 'Tab. V-Plex'
    #                ]
    class_names = ['Cap. PG 50mg', 'Cap. Sergel 20mg', 'Tab. Afenac 50mg', 'Tab. Calcin D', 'Tab. Coralex-DX',
                   'Tab. Finix 20mg', 'Tab. Fixal 120mg', 'Tab. Napa Extend 665mg', 'Tab. Naprosyn 500mg',
                   'Tab. Napryn 500mg', 'Tab. Osartil 100mg', 'Tab. Povital', 'Tab. Relaxo 25mg',
                   'Tab. Rivotril 0.5mg', 'Tab. Riz 10mg'
                   ]

    # image preprocessing
    img_array = preprocess(img)
    rgb_image = cv2.cvtColor(img_array, cv2.COLOR_GRAY2RGB)
    img_array = tf.keras.preprocessing.image.img_to_array(rgb_image) / 255
    img_array = tf.expand_dims(img_array, 0)

    # prediction
    predictions = model.predict(img_array, verbose=0)

    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)
    return predicted_class, confidence


def get_medicine_info(label: str) -> (str, str, str):
    firstSplit = label.split('.')
    category = firstSplit[0]
    leftOver = '.'.join(firstSplit[1:]).strip()
    secondSplit = leftOver.split(' ')
    medicine_name = ''
    strength = ''
    if 'mg' in secondSplit[-1]:
        strength = secondSplit[-1]
        medicine_name = ' '.join(secondSplit[:-1])
    else:
        medicine_name = ' '.join(secondSplit)
    return category, medicine_name, strength


@predict.route('/', methods=['POST'])
def prediction():
    db_medicines = get_db().medicines

    requested_photos = request.files
    photos = []
    returned_value = []

    for r_img in requested_photos:
        photos.append({
            'id': request.files[r_img].filename,
            'arr': np.array(Image.open(request.files[r_img]).convert("RGB").resize((256, 72)))
        })

    for i in range(len(photos)):
        label, confidence = img_predict(photos[i]['arr'])
        _category, medicine_name, strength = get_medicine_info(label)
        medicine = None

        if strength:
            idx = strength.find('m')
            strength = strength[:idx] + ' ' + strength[idx:]
            medicine = db_medicines.find_one({
                'name': medicine_name,
                'strength': strength
            })
        else:
            medicine = db_medicines.find_one({'name': medicine_name})

        alt_brands = []
        if medicine:
            alt_brands = get_alternate_brands(
                db_medicines, medicine) if medicine else []

        returned_value.append({
            'id': photos[i]['id'],
            'label': label,
            'medicine': get_payload(medicine) if medicine else {'name': 'N/A', 'generic': 'N/A', 'strength': 'N/A', 'price': 'N/A', 'company': 'N/A', 'category': 'N/A', 'id': 'N/A'},
            'confidence': confidence,
            'alternative_brands': alt_brands,
        })

    return jsonify(returned_value), 200
