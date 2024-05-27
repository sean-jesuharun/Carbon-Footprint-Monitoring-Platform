import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import MiniDrawer from './MiniDrawer';

const VendorManagementForm = () => {
  const [formData, setFormData] = useState({
    vendorId: '',
    vendorName: '',
    vendorLocation: '',
    distanceFromWarehouse: '',
    products: [''] // List of products
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate fields
    if (name === 'vendorId' && value < 0) return; // Vendor Id should not accept negative values
    if (name === 'vendorName' && /\d/.test(value)) return; // Vendor Name should not accept numbers
    if (name === 'vendorLocation' && /\d/.test(value)) return; // Vendor Location should not accept negative values
    if (name === 'distanceFromWarehouse' && (value < 0 || isNaN(value))) return; // Distance should not accept negative values or strings

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProductChange = (index, e) => {
    const { value } = e.target;
    // Products should not accept numbers
    if (/\d/.test(value)) return;
    const updatedProducts = [...formData.products];
    updatedProducts[index] = value;
    setFormData({
      ...formData,
      products: updatedProducts
    });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, '']
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      products: updatedProducts
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log form data to console
    // Reset the form
    setFormData({
      vendorId: '',
      vendorName: '',
      vendorLocation: '',
      distanceFromWarehouse: '',
      products: ['']
    });
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
            <Typography variant="subtitle1" gutterBottom>Vendor Id:</Typography>
            <TextField
              type="number"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ min: 0 }} // Ensure input does not accept negative values
            />
            <Typography variant="subtitle1" gutterBottom>Vendor Name:</Typography>
            <TextField
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ pattern: "[^0-9]*" }} // Ensure input does not accept numbers
            />
            <Typography variant="subtitle1" gutterBottom>Vendor Location:</Typography>
            <TextField
              type="text"
              name="vendorLocation"
              value={formData.vendorLocation}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ pattern: "[^0-9]*" }} // Ensure input does not accept numbers
            />
            <Typography variant="subtitle1" gutterBottom>Distance from Sysco warehouse (km):</Typography>
            <TextField
              type="number"
              name="distanceFromWarehouse"
              value={formData.distanceFromWarehouse}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ min: 0 }} // Ensure input does not accept negative values or strings
            />
            <hr />
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Products</Typography>
            {formData.products.map((product, index) => (
              <div key={index}>
                <TextField
                  type="text"
                  name="product"
                  value={product}
                  onChange={(e) => handleProductChange(index, e)}
                  fullWidth
                  required
                  placeholder={`Product ${index + 1}`}
                  inputProps={{ pattern: "[^0-9]*" }} // Ensure input does not accept numbers
                />
                <Button type="button" onClick={() => handleRemoveProduct(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddProduct}>Add Product</Button>
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
