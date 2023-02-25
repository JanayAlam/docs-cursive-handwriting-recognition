from flask import Blueprint, request, jsonify
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

predict = Blueprint(name='predict', url_prefix='/api/predict', import_name='predict')


@predict.route('/', methods=['POST'])
def prediction():
    requested_photos = request.files
    photos = []

    for r_img in requested_photos:
        photos.append({
            'id': request.files[r_img].filename,
            'arr': np.array(Image.open(request.files[r_img]).convert("L").resize((256, 72)))
        })

    for i in range(1, 4):
        plt.subplot(1, 3, i)
        plt.imshow(photos[i-1]['arr'], cmap='gray')
        plt.axis('off')
    plt.show()

    return jsonify([
        {
            'id': photo['id'],
            'label': 'Tab. Atova 20mg'
        } for photo in photos
    ]), 200
