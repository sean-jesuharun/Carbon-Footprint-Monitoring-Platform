import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, MenuItem } from '@mui/material';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';

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
    updatedProducts[index][field] = value;
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

    // Log form data to console
    console.log(formData);

    // Send a POST request to the backend API
    const url = 'http://localhost:8060/vendors'; 
    const requestData = { ...formData };

    try {
      const response = await axios.post(url, requestData);
      console.log('Data submitted successfully:', response.data);
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

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <MiniDrawer />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Vendor Management Form</Typography>
        <Card style={{ width: '70%', margin: '0 auto' }}>
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
                    {/* Add other region options */}
                  </TextField>
                  {/* Repeat similar select fields for other production matrix attributes */}
                </div>
                <Button onClick={() => removeProduct(index)} variant="outlined" color="secondary" style={{ marginTop: '10px' }}>Remove Product</Button>
              </div>
            ))}
            <Button onClick={addProduct} variant="outlined" style={{ marginTop: '10px' }}>Add Product</Button>
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default VendorManagementForm;
