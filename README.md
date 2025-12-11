# 🚗 V-Price – Used Car Price Predictor (INR)

> **Predict used car prices in Indian Rupees (₹) using Machine Learning — in seconds!**

A full-stack web application that estimates the market value of used cars based on brand, year, mileage, and condition. Built with **Flask (Python)** on the backend and **HTML/CSS/JavaScript (Tailwind)** on the frontend. Perfect for internship portfolios or real-world deployment.

![V-Price Mockup](https://i.imgur.com/your-mockup-link.png)  
*(Replace with actual screenshot when deployed)*

---

## 🎯 Objective

Build a user-friendly, responsive web app that helps buyers and sellers estimate fair market prices for used vehicles in **Indian Rupees (₹)** using real-world data and a trained **Random Forest Regressor** model.

---

## 📊 Dataset Overview

- **Source**: Real-world used vehicle listings (50,000+ records)
- **Columns Used**:
  - `make` (e.g., Toyota, Hyundai, Ford)
  - `year` (manufacture year)
  - `mileage` (in miles → converted to **km**)
  - `price` (in USD → converted to **INR** at ₹83/USD)
- **Target**: Predict `price`
- **Preprocessing**:
  - Removed outliers (`price < ₹1,000` or `> ₹10,00,00,000`)
  - Handled missing values
  - Engineered `age = 2025 - year`
  - Encoded `make` using `LabelEncoder`

> 📝 **Note**: `condition` is not in the original dataset, so it’s applied as a **post-prediction business rule** (+5% for Excellent, –5% for Fair).

---

## ⚙️ Tech Stack

| Layer        | Technology                                     |
|--------------|-----------------------------------------------|
| **Frontend** | HTML5, CSS3 (Tailwind via CDN), JavaScript    |
| **Backend**  | Python, Flask                                 |
| **ML**       | Scikit-learn (`RandomForestRegressor`)        |
| **Data**     | Pandas, NumPy                                 |
| **Plotting** | Chart.js (for Actual vs Predicted scatter)    |
| **Styling**  | Tailwind CSS, Font Awesome, Inter font        |
| **Deployment**| Render, Railway, or AWS EC2 (ready-to-deploy) |

---

## 🌟 Features

- ✅ **Real-time price prediction** in **Indian Rupees (₹)** with comma formatting (e.g., ₹2,84,500)
- ✅ Input form with **brand dropdown**, **year**, **mileage (km)**, and **condition radio buttons**
- ✅ **Model metrics** displayed: RMSE, Accuracy (R²), Dataset size
- ✅ **Scatter plot** of actual vs predicted prices (from test set)
- ✅ **Recent predictions history** stored in `localStorage`
- ✅ **Fully responsive** – works on mobile, tablet, and desktop
- ✅ **Modern UI** with teal (#00796b) primary color, clean cards, and soft shadows
- ✅ Car image with **white background + soft shadow** (matches mockup)

---

## 📁 Project Structure

```
v-price/
├── data/
│   └── dataset.csv              # Your vehicle dataset
├── models/
│   ├── car_price_model.pkl      # Trained ML model
│   └── make_encoder.pkl         # Label encoder for 'make'
├── static/
│   ├── css/
│   │   └── style.css            # Custom styling
│   ├── js/
│   │   └── app.js               # (Optional) JS logic
│   ├── images/
│   │   └── car-hero.jpg         # White-bg car image
│   └── data/
│       └── test_predictions.csv # For scatter plot
├── templates/
│   └── index.html               # Main UI
├── app.py                       # Flask backend
├── train.py                     # Model training script
├── requirements.txt             # Dependencies
└── README.md                    # You're reading it!
```

---

## ▶️ How to Run Locally

### 1. Clone or set up the project
```bash
git clone https://github.com/your-username/v-price.git
cd v-price
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Place your dataset
- Put `dataset.csv` in the `data/` folder.

### 4. Train the model
```bash
python train.py
```
> This creates `models/` and `static/data/test_predictions.csv`.

### 5. Run the Flask app
```bash
python app.py
```

### 6. Open in browser
Go to:  
👉 **http://localhost:5000**

---

## 🔮 Future Scope

- **Enhanced Model Accuracy**: Incorporate additional features like fuel type, transmission, engine size, and location to improve prediction accuracy.
- **Real-Time Data Integration**: Integrate with APIs (e.g., vehicle history reports, market trends) for dynamic pricing updates.
- **User Authentication & History**: Add user accounts to save prediction history, compare estimates, and provide personalized insights.
- **Mobile App Version**: Develop a React Native or Flutter app for on-the-go price predictions.
- **Advanced ML Techniques**: Experiment with deep learning models (e.g., Neural Networks) or ensemble methods for better performance.
- **Multi-Currency Support**: Extend predictions to other currencies beyond INR for global users.
- **Admin Dashboard**: Create a backend interface for model retraining, data updates, and analytics.
- **API Endpoints**: Expose RESTful APIs for third-party integrations (e.g., dealership software).

---

## 📬 Contact

Built with ❤️ by **Naitik Kushwaha**  
📧 Email: [naitikk682@gmail.com](mailto:naitikk682@gmail.com)  
🔗 Portfolio: [\[https://naitik-portfolio-1.onrender.com/\](https://naitik-portfolio-1.onrender.com/)](https://naitik-portfolio-1.onrender.com/)

> 💡 **Looking for a full-stack developer?** I’m open to internships in **Web Development, Software Engineering, and Frontend**!

---

# vehicle-price-prediction
