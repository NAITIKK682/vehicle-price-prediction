import pandas as pd
import numpy as np
import pickle
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

os.makedirs("models", exist_ok=True)
os.makedirs("static/data", exist_ok=True)

# Load and clean
df = pd.read_csv("data/dataset.csv", on_bad_lines='skip', low_memory=False)

# Clean price
df['price'] = pd.to_numeric(df['price'], errors='coerce')
df = df.dropna(subset=['price', 'make', 'year', 'mileage'])
df = df[(df['price'] > 1000) & (df['price'] < 10_000_000)]

# Convert mileage to km
df['mileage_km'] = df['mileage'] * 1.60934

# Encode make
le = LabelEncoder()
df['make_enc'] = le.fit_transform(df['make'])

# Features
X = df[['make_enc', 'year', 'mileage_km']]
y = df['price']

# Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save test predictions for plot
y_pred = model.predict(X_test)
pd.DataFrame({'actual_price': y_test, 'predicted_price': y_pred}).to_csv("static/data/test_predictions.csv", index=False)

# Save model & encoder
with open("models/car_price_model.pkl", "wb") as f:
    pickle.dump(model, f)
with open("models/make_encoder.pkl", "wb") as f:
    pickle.dump(le, f)

print("✅ Model and encoder saved to models/")