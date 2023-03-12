import matplotlib.pyplot as plt
import pandas as pd
from flask import Blueprint, jsonify

from docs_handwriting_recognizer.db import get_db

seed = Blueprint(name='seed', url_prefix='/api/seed', import_name='seed')

def get_all_medicines():
    df = pd.read_csv('./datasets/medicine_dataset.csv')
    df.drop(['Unnamed: 0'], axis=1, inplace=True)
   
    medicines = df.to_numpy()
    r_arr = []
    for medicine in medicines:
        r_arr.append({
            'name': medicine[0],
            'category': medicine[1],
            'generic': medicine[2],
            'strength': medicine[3],
            'company': medicine[4],
            'price': medicine[5]
        })

    return r_arr


@seed.route('/medicines', methods=['POST'])
def seed_all_medicines():
    db_medicines = get_db().medicines

    try:
        db_medicines.insert_many(get_all_medicines())
        return jsonify({
            'message': 'Successfully seeded all medicines',
            'error': None
        }), 201
    except Exception as e:
        return jsonify({
            'message': 'Could not seeded all medicines',
            'error': str(e)
        }), 500

