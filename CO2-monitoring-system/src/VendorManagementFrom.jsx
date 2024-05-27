import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import MiniDrawer from './MiniDrawer';

const VendorManagementForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorLocation: '',
    distanceFromWarehouse: '',
    products: [''] // List of products
  });

  const [errors, setErrors] = useState({
    vendorName: '',
    vendorLocation: '',
    distanceFromWarehouse: '',
    products: ['']
  });

  const validateField = (name, value) => {
    let error = '';
    const lettersAndSpaces = /^[A-Za-z\s]*$/;
    if ((name === 'vendorName' || name === 'vendorLocation') && !lettersAndSpaces.test(value)) {
      error = 'This field should only contain letters and spaces';
    }
    if (name === 'distanceFromWarehouse') {
      if (isNaN(value) || value <= 0) {
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

  const handleProductChange = (index, e) => {
    const { value } = e.target;
    let error = '';
    const lettersAndSpaces = /^[A-Za-z\s]*$/;
    if (!lettersAndSpaces.test(value)) {
      error = 'Product name should only contain letters and spaces';
    }

    const updatedProducts = [...formData.products];
    updatedProducts[index] = value;

    const updatedProductErrors = [...errors.products];
    updatedProductErrors[index] = error;

    setFormData({
      ...formData,
      products: updatedProducts
    });
    setErrors({
      ...errors,
      products: updatedProductErrors
    });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, '']
    });
    setErrors({
      ...errors,
      products: [...errors.products, '']
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    const updatedProductErrors = [...errors.products];
    updatedProductErrors.splice(index, 1);

    setFormData({
      ...formData,
      products: updatedProducts
    });
    setErrors({
      ...errors,
      products: updatedProductErrors
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {
      vendorName: validateField('vendorName', formData.vendorName),
      vendorLocation: validateField('vendorLocation', formData.vendorLocation),
      distanceFromWarehouse: validateField('distanceFromWarehouse', formData.distanceFromWarehouse),
      products: formData.products.map(product => validateField('product', product))
    };

    if (newErrors.vendorName || newErrors.vendorLocation || newErrors.distanceFromWarehouse || newErrors.products.some(err => err)) {
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log(formData); // Log form data to console
      // Reset the form
      setFormData({
        vendorName: '',
        vendorLocation: '',
        distanceFromWarehouse: '',
        products: ['']
      });
      setErrors({
        vendorName: '',
        vendorLocation: '',
        distanceFromWarehouse: '',
        products: ['']
      });
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
              name="vendorLocation"
              value={formData.vendorLocation}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.vendorLocation}
              helperText={errors.vendorLocation}
            />
            <Typography variant="subtitle1" gutterBottom>Distance from Sysco warehouse (km):</Typography>
            <TextField
              type="number"
              name="distanceFromWarehouse"
              value={formData.distanceFromWarehouse}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.distanceFromWarehouse}
              helperText={errors.distanceFromWarehouse}
              inputProps={{ min: 1 }} // Ensure input does not accept 0 or negative values
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
                  error={!!errors.products[index]}
                  helperText={errors.products[index]}
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
