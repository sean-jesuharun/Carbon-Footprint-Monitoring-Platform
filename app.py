import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# Creating flask app
app = Flask(__name__)

# Loading the pickle model
model = pickle.load(open("svr_model.pkl", "rb"))

# Load fitted encoder and scaler
with open("encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    json_ = request.json
    query_df = pd.DataFrame(json_)
    
    # One-hot encode the categorical variables
    query_df_encoded = encoder.transform(query_df)
    
    # Scale the input data
    query_df_scaled = scaler.transform(query_df_encoded)
    
    # Use the trained SVR model to make predictions
    predicted_intensity = model.predict(query_df_scaled)
    
    # Return the predicted emission intensity
    return jsonify({"predicted_emission_intensity": predicted_intensity.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
