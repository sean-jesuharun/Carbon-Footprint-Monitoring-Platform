# In[1]:

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from scipy.stats import chi2_contingency
import seaborn as sns
from sklearn.metrics import mean_absolute_error


# In[2]:


live_stock = pd.read_csv("GLEAM_LivestockEmissions.csv")


# In[3]:


#Removing unnecessary columns form dataset
live_stock_subset = live_stock[['Region', 'Animal species', 'Production system', 'Commodity',
       'Emission Intensity (kg CO2e per kg protein)']]

live_stock_subset


# In[4]:


#Renaming the columns
df = live_stock_subset.rename(columns={'Region': 'region', 'Animal species': 'animal_type','Production system':'production_sys','Commodity':'commodity','Emission Intensity (kg CO2e per kg protein)':'emission_intensity'}, inplace=False)
df


# In[5]:


df.describe()


# In[6]:


#Encode Categorical Variables
from sklearn.preprocessing import OneHotEncoder

# One-hot encode categorical variables
encoder = OneHotEncoder() #create an object from OneHotEncoder() class
X_encoded = encoder.fit_transform(df[['region', 'animal_type', 'production_sys', 'commodity']])


# In[7]:


#Split data set for training and testing

from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X_encoded, df['emission_intensity'], test_size=0.2, random_state=42)


# In[8]:


from sklearn.preprocessing import StandardScaler

# Initialize StandardScaler with with_mean=False
scaler = StandardScaler(with_mean=False)

# Fit scaler to training data and transform training data
X_train_scaled = scaler.fit_transform(X_train)

# Transform test data using the fitted scaler
X_test_scaled = scaler.transform(X_test)


# In[9]:


from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVR

# Define hyperparameter grid
param_grid = {
    'C': [0.1, 1, 10, 100, 1000, 10000],
    'epsilon': [0.01, 0.1, 1, 10, 100],
}

# Creating svr object
svr_model = SVR()

# Initialize GridSearchCV
grid_search = GridSearchCV(svr_model, param_grid, cv=5, scoring='neg_mean_absolute_error')

# Perform grid search
grid_search.fit(X_train_scaled, y_train)

# Get best hyperparameters
best_params = grid_search.best_params_
print("Best Hyperparameters:", best_params)

#After getting the optimal values for C and epsilon I will create the best model and
#calculate the MAE

# Get the best model
best_model = grid_search.best_estimator_

# Now, use the best model for evaluation
# Predict target values for the scaled test data
y_pred = best_model.predict(X_test_scaled)

# Compute mean absolute error
test_mae = mean_absolute_error(y_test, y_pred)
print("Test MAE:", test_mae)


# In[10]:


# Initialize SVR model with desired parameters
svr_model = SVR(kernel='rbf', C=1000.0, epsilon=0.01)

# Fit SVR model to the scaled training data
svr_model.fit(X_train_scaled, y_train)

# Predict target values for the scaled test data using the manually initialized SVR model
y_pred_manual = svr_model.predict(X_test_scaled)

# Compute mean absolute error for the manually initialized SVR model.
# This value is equal to MAE of the best model
test_mae_manual = mean_absolute_error(y_test, y_pred_manual)
print("Test MAE for the manually initialized SVR model:", test_mae_manual)


# In[11]:


from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
# Calculate training error (Mean Absolute Error)
train_mae = mean_absolute_error(y_train, svr_model.predict(X_train_scaled))
print("Training MAE:", train_mae)

# Calculate testing error (Mean Absolute Error) - Already calculated previously
print("Testing MAE:", test_mae)

# Calculate R-Squared 
r2 = r2_score(y_test, y_pred)
print("R_squared (R2):",r2)


# In[19]:


# Example input data
new_data = pd.DataFrame({
    'region': ['Eastern Europe'],
    'animal_type': ['Goats'],
    'production_sys': ['Mixed systems'],
    'commodity': ['Meat']
})

# One-hot encode and scale the input data
new_data_encoded = encoder.transform(new_data)
new_data_scaled = scaler.transform(new_data_encoded)

# Use the trained SVR model to make predictions
predicted_intensity = best_model.predict(new_data_scaled)

# Display the predicted emission intensity
print("Predicted Emission Intensity:", predicted_intensity)


# In[ ]:




