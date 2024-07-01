import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, MenuItem, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import BackDrop from '../BackDrop';
import Navbar from '../Navbar';

const VendorManagementForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    location: '',
    distanceFromWarehouse: '',
    vendorProducts: [],
    nonLivestockProducts: [],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      vendorProducts: updatedProducts,
    });
  };

  const handleNonLivestockProductChange = (index, field, value) => {
    const updatedNonLivestockProducts = [...formData.nonLivestockProducts];
    const updatedProduct = { ...updatedNonLivestockProducts[index] };
  
    updatedProduct[field] = value;
  
    updatedNonLivestockProducts[index] = updatedProduct;
    setFormData({
      ...formData,
      nonLivestockProducts: updatedNonLivestockProducts,
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
            commodity: '',
          },
        },
      ],
    });
  };

  const addNonLivestockProduct = () => {
    setFormData({
      ...formData,
      nonLivestockProducts: [
        ...formData.nonLivestockProducts,
        {
          nonLivestockProductName: '',
        },
      ],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.vendorProducts];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      vendorProducts: updatedProducts,
    });
  };

  const removeNonLivestockProduct = (index) => {
    const updatedNonLivestockProducts = [...formData.nonLivestockProducts];
    updatedNonLivestockProducts.splice(index, 1);
    setFormData({
      ...formData,
      nonLivestockProducts: updatedNonLivestockProducts,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSnackbarMessage('');

    try {
      // Replace '/vendors' with your actual API endpoint for vendor submission
      await axiosInstance.post('/vendors', formData);
      setSnackbarMessage('Vendor details submitted successfully!');
      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestError = (error) => {
    let errorMessage = 'An error occurred while processing your request.';
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        errorMessage = error.response.data.errors.map((err) => err.message).join(', ');
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    }
    setError(errorMessage);
    setErrorOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
    setErrorOpen(false);
  };

  const resetForm = () => {
    setFormData({
      vendorName: '',
      location: '',
      distanceFromWarehouse: '',
      vendorProducts: [],
      nonLivestockProducts: [],
    });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Navbar />
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <br />
        <br />
        <Typography variant='h3' color='#5D6259' fontWeight={1000} sx={{ textAlign: 'center' }}>
          Vendor Management Form
        </Typography>
        <Card style={{ width: '50%', margin: '2rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Vendor Name:</Typography>
            <TextField
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Vendor Location:</Typography>
            <TextField
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Distance From Warehouse (km):</Typography>
            <TextField
              type="number"
              name="distanceFromWarehouse"
              value={formData.distanceFromWarehouse}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ step: "0.01", min: "0.01" }}
            />
            <Typography variant="subtitle1" gutterBottom>Vendor Products:</Typography>
            {formData.vendorProducts.map((product, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <TextField
                  type="text"
                  label="Product Name"
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
                    <MenuItem value="Western Europe">Western Europe</MenuItem>
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
                <Button type="button" onClick={() => removeProduct(index)} style={{backgroundColor:'#198773',color:'#ffffff',margin:'0.5rem'}} >Remove</Button>
              </div>
            ))}
            {formData.nonLivestockProducts.map((product, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <TextField
  select
  label="Non Livestock Product Name"
  value={product.nonLivestockProductName}
  onChange={(e) => handleNonLivestockProductChange(index, 'nonLivestockProductName', e.target.value)}
  fullWidth
  required
>
  <MenuItem value="Wheat & Rye (Bread)">Wheat & Rye (Bread)</MenuItem>
  <MenuItem value="Maize (Meal)">Maize (Meal)</MenuItem>
  <MenuItem value="Barley (Beer)">Barley (Beer)</MenuItem>
  <MenuItem value="Oatmeal">Oatmeal</MenuItem>
  <MenuItem value="Rice">Rice</MenuItem>
  <MenuItem value="Potatoes">Potatoes</MenuItem>
  <MenuItem value="Cassava">Cassava</MenuItem>
  <MenuItem value="Cane Sugar">Cane Sugar</MenuItem>
  <MenuItem value="Beet Sugar">Beet Sugar</MenuItem>
  <MenuItem value="Other Pulses">Other Pulses</MenuItem>
  <MenuItem value="Peas">Peas</MenuItem>
  <MenuItem value="Nuts">Nuts</MenuItem>
  <MenuItem value="Groundnuts">Groundnuts</MenuItem>
  <MenuItem value="Soymilk">Soymilk</MenuItem>
  <MenuItem value="Tofu">Tofu</MenuItem>
  <MenuItem value="Soybean Oil">Soybean Oil</MenuItem>
  <MenuItem value="Palm Oil">Palm Oil</MenuItem>
  <MenuItem value="Sunflower Oil">Sunflower Oil</MenuItem>
  <MenuItem value="Rapeseed Oil">Rapeseed Oil</MenuItem>
  <MenuItem value="Olive Oil">Olive Oil</MenuItem>
  <MenuItem value="Tomatoes">Tomatoes</MenuItem>
  <MenuItem value="Onions & Leeks">Onions & Leeks</MenuItem>
  <MenuItem value="Root Vegetables">Root Vegetables</MenuItem>
  <MenuItem value="Brassicas">Brassicas</MenuItem>
  <MenuItem value="Other Vegetables">Other Vegetables</MenuItem>
  <MenuItem value="Citrus Fruit">Citrus Fruit</MenuItem>
  <MenuItem value="Bananas">Bananas</MenuItem>
  <MenuItem value="Apples">Apples</MenuItem>
  <MenuItem value="Berries & Grapes">Berries & Grapes</MenuItem>
  <MenuItem value="Wine">Wine</MenuItem>
  <MenuItem value="Other Fruit">Other Fruit</MenuItem>
  <MenuItem value="Coffee">Coffee</MenuItem>
  <MenuItem value="Dark Chocolate">Dark Chocolate</MenuItem>
</TextField>

                <Button type="button" onClick={() => removeNonLivestockProduct(index)} style={{backgroundColor:'#198773',color:'#ffffff',margin:'0.5rem'}} >Remove</Button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px' }}>
            <Button type="button" onClick={addProduct} style={{ backgroundColor:'#198773', color:'#ffffff' }}>ADD LIVESTOCK PRODUCT</Button>
            <Button type="button" onClick={addNonLivestockProduct} style={{ backgroundColor:'#198773', color:'#ffffff' }}>ADD NON LIVESTOCK PRODUCT</Button>
            </div>

          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: '10px 20px',
              color: '#ffffff',
              backgroundColor: '#198773',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#198773'
              },
            }}
          >
            Submit
          </Button>
        </div>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      {loading && <BackDrop />}
    </div>
  );
};

export default VendorManagementForm;
