import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Navbar from '../Navbar';

const VendorManagementForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    location: '',
    distanceFromWarehouse: '',
    vendorProducts: []
  });

  const [errors, setErrors] = useState({
    vendorName: '',
    location: '',
    distanceFromWarehouse: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message state

  const validateField = (name, value) => {
    let error = '';
    const lettersAndSpaces = /^[A-Za-z\s]*$/;

    if ((name === 'vendorName' || name === 'location') && !lettersAndSpaces.test(value)) {
      error = 'This field should only contain letters and spaces';
    }
    if (name === 'distanceFromWarehouse') {
      const distance = parseFloat(value);
      if (isNaN(distance) || distance <= 0) {
        error = 'Distance should be a positive number greater than 0';
      }
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.vendorProducts];
    const updatedProduct = { ...updatedProducts[index] };

    if (field in updatedProduct.productionMatrix) {
      updatedProduct.productionMatrix[field] = value;
    } else {
      updatedProduct[field] = value;
    }

    updatedProducts[index] = updatedProduct;
    setFormData({
      ...formData,
      vendorProducts: updatedProducts
    });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      vendorProducts: [
        ...formData.vendorProducts,
        {
          productName: '',
          productionMatrix: {
            region: '',
            animalSpecies: '',
            productionSystem: '',
            commodity: ''
          }
        }
      ]
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.vendorProducts];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      vendorProducts: updatedProducts
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const url = 'http://localhost:8050/vendors'; 
    const requestData = { ...formData };

    try {
      const response = await axios.post(url, requestData);
      console.log('Data submitted successfully:', response.data);

      // Show success snackbar
      setSnackbarMessage('Vendor details submitted successfully!');
      setSnackbarOpen(true);

      // Reset the form
      setFormData({
        vendorName: '',
        location: '',
        distanceFromWarehouse: '',
        vendorProducts: []
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Vendor Management Form</Typography>
        <Card style={{ width: '100%', margin: '0 auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Vendor Name:</Typography>
            <TextField
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.vendorName}
              helperText={errors.vendorName}
            />
            <Typography variant="subtitle1" gutterBottom>Vendor Location:</Typography>
            <TextField
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.location}
              helperText={errors.location}
            />
            <Typography variant="subtitle1" gutterBottom>Distance From Warehouse (km):</Typography>
            <TextField
              type="number"
              name="distanceFromWarehouse"
              value={formData.distanceFromWarehouse}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.distanceFromWarehouse}
              helperText={errors.distanceFromWarehouse}
              inputProps={{ step: "0.01", min: "0.01" }} // Ensure input accepts decimal values
            />
            <Typography variant="subtitle1" gutterBottom>Vendor Products:</Typography>
            {formData.vendorProducts.map((product, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <TextField
                  type="text"
                  label={`Product Name ${index + 1}`}
                  value={product.productName}
                  onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                  fullWidth
                  required
                />
                <div style={{ display: 'flex', marginTop: '5px' }}>
                  <TextField
                    select
                    label="Region"
                    value={product.productionMatrix.region}
                    onChange={(e) => handleProductChange(index, 'region', e.target.value)}
                    style={{ marginRight: '10px', width: '150px' }}
                  >
                    <MenuItem value="Global">Global</MenuItem>
                    <MenuItem value="East Asia and Southeast Asia">East Asia and Southeast Asia</MenuItem>
                    <MenuItem value="Eastern Europe">Eastern Europe</MenuItem>
                    <MenuItem value="Latin America and the Caribbean">Latin America and the Caribbean</MenuItem>
                    <MenuItem value="Near East and North Africa">Near East and North Africa</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="Oceania">Oceania</MenuItem>
                    <MenuItem value="Russian Federation">Russian Federation</MenuItem>
                    <MenuItem value="South Asia">South Asia</MenuItem>
                    <MenuItem value="Sub-Saharan Africa">Sub-Saharan Africa</MenuItem>
                    <MenuItem value="Western Europe">Western Europe</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="Animal Species"
                    value={product.productionMatrix.animalSpecies}
                    onChange={(e) => handleProductChange(index, 'animalSpecies', e.target.value)}
                    style={{ marginRight: '10px', width: '150px' }}
                  >
                    <MenuItem value="Cattle">Cattle</MenuItem>
                    <MenuItem value="Buffaloes">Buffaloes</MenuItem>
                    <MenuItem value="Sheep">Sheep</MenuItem>
                    <MenuItem value="Goats">Goats</MenuItem>
                    <MenuItem value="Pigs">Pigs</MenuItem>
                    <MenuItem value="Chicken">Chicken</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="Production System"
                    value={product.productionMatrix.productionSystem}
                    onChange={(e) => handleProductChange(index, 'productionSystem', e.target.value)}
                    style={{ marginRight: '10px', width: '150px' }}
                  >
                    <MenuItem value="Aggregated">Aggregated</MenuItem>
                    <MenuItem value="Grassland systems">Grassland systems</MenuItem>
                    <MenuItem value="Mixed systems">Mixed systems</MenuItem>
                    <MenuItem value="Feedlots">Feedlots</MenuItem>
                    <MenuItem value="Backyard systems">Backyard systems</MenuItem>
                    <MenuItem value="Intermediate systems">Intermediate systems</MenuItem>
                    <MenuItem value="Industrial systems">Industrial systems</MenuItem>
                    <MenuItem value="Layers">Layers</MenuItem>
                    <MenuItem value="Broilers">Broilers</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="Commodity"
                    value={product.productionMatrix.commodity}
                    onChange={(e) => handleProductChange(index, 'commodity', e.target.value)}
                    style={{ width: '150px' }}
                  >
                    <MenuItem value="Aggregated">Aggregated</MenuItem>
                    <MenuItem value="Milk">Milk</MenuItem>
                    <MenuItem value="Meat">Meat</MenuItem>
                    <MenuItem value="Eggs">Eggs</MenuItem>
                  </TextField>
                </div>
                <Button onClick={() => removeProduct(index)} variant="outlined" color="secondary" style={{ marginTop: '10px' }}>Remove Product</Button>
              </div>
            ))}
            <Button onClick={addProduct} variant="outlined" style={{ marginTop: '10px' }}>Add Product</Button>
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' 
          sx={{ 
            padding: '10px 20px', 
            color: '#fff', 
            backgroundColor: '#1b263b',
            '&:hover': {
              backgroundColor: '#778da9',
            },
          }}>Submit</Button>
        </div>
      </form>

      {/* Snackbar for Success Message */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Changed position to top center
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VendorManagementForm;
