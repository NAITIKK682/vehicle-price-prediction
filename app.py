# app.py
from flask import Flask, render_template, jsonify, request
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__, static_folder='public') 

app = Flask(__name__)

# Load model and encoder
with open('models/car_price_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('models/make_encoder.pkl', 'rb') as f:
    make_encoder = pickle.load(f)

# Get unique makes for dropdown
makes = make_encoder.classes_.tolist()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/makes')
def get_makes():
    return jsonify(makes)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        make = data['make']
        year = int(data['year'])
        mileage_km = float(data['mileage_km'])
        condition = data.get('condition', 'Good')  # Default to Good

        # Encode make
        if make not in make_encoder.classes_:
            return jsonify({'error': 'Invalid make'})

        make_encoded = make_encoder.transform([make])[0]

        # Predict
        input_data = np.array([[make_encoded, year, mileage_km]])
        predicted_price_usd = model.predict(input_data)[0]

        # Apply condition adjustment (simulated business logic)
        condition_multiplier = {
            'Fair': 0.95,    # -5%
            'Good': 1.00,    # No change
            'Excellent': 1.05 # +5%
        }
        adjusted_price_usd = predicted_price_usd * condition_multiplier[condition]

        # Convert to INR (assuming 1 USD = 83 INR; adjust as needed)
        predicted_price_inr = adjusted_price_usd * 83

        # Round to nearest 100
        predicted_price_inr = round(predicted_price_inr, -2)

        return jsonify({
            'predicted_price_inr': int(predicted_price_inr),
            'predicted_price_usd': int(predicted_price_usd),
            'condition_adjustment': condition_multiplier[condition]
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)