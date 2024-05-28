import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import MiniDrawer from '../MiniDrawer';

const VendorSupplyForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    supplyDate: '',
    products: [{ productName: '', quantity: '' }]
  });

  const [errors, setErrors] = useState({
    vendorName: '',
    supplyDate: '',
    products: [{ productName: '', quantity: '' }]
  });

  const validateField = (name, value, index = null) => {
    let error = '';
    const lettersAndSpaces = /^[A-Za-z\s]*$/;

    if (name === 'vendorName' && !lettersAndSpaces.test(value)) {
      error = 'This field should only contain letters and spaces';
    }
    if (name === 'supplyDate') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        error = 'Please enter a valid date';
      }
    }
    if (name === 'productName' && !lettersAndSpaces.test(value)) {
      error = 'Product name should only contain letters and spaces';
    }
    if (name === 'quantity') {
      if (isNaN(value) || value <= 0) {
        error = 'Quantity should be a positive number';
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
    const { name, value } = e.target;
    const error = validateField(name, value);

    const updatedProducts = [...formData.products];
    updatedProducts[index][name] = value;

    const updatedProductErrors = [...errors.products];
    updatedProductErrors[index][name] = error;

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
      products: [...formData.products, { productName: '', quantity: '' }]
    });
    setErrors({
      ...errors,
      products: [...errors.products, { productName: '', quantity: '' }]
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
      supplyDate: validateField('supplyDate', formData.supplyDate),
      products: formData.products.map((product, index) => ({
        productName: validateField('productName', product.productName, index),
        quantity: validateField('quantity', product.quantity, index)
      }))
    };

    if (
      newErrors.vendorName ||
      newErrors.supplyDate ||
      newErrors.products.some(productError => productError.productName || productError.quantity)
    ) {
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log(formData); // Log form data to console
      // Reset the form
      setFormData({
        vendorName: '',
        supplyDate: '',
        products: [{ productName: '', quantity: '' }]
      });
      setErrors({
        vendorName: '',
        supplyDate: '',
        products: [{ productName: '', quantity: '' }]
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <MiniDrawer />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Vendor Supply Form</Typography>
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
            <Typography variant="subtitle1" gutterBottom>Supply Date:</Typography>
            <TextField
              type="date"
              name="supplyDate"
              value={formData.supplyDate}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.supplyDate}
              helperText={errors.supplyDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <hr />
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Supplied Products</Typography>
            {formData.products.map((product, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <TextField
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={(e) => handleProductChange(index, e)}
                  fullWidth
                  required
                  placeholder={`Product Name ${index + 1}`}
                  error={!!errors.products[index]?.productName}
                  helperText={errors.products[index]?.productName}
                  style={{ marginBottom: '0.5rem' }}
                />
                <TextField
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, e)}
                  fullWidth
                  required
                  placeholder={`Quantity ${index + 1}`}
                  error={!!errors.products[index]?.quantity}
                  helperText={errors.products[index]?.quantity}
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

export default VendorSupplyForm;
