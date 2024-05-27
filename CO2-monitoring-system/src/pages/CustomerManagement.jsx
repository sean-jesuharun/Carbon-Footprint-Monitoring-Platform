import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import MiniDrawer from '../MiniDrawer';

const CustomerManagementForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerLocation: '',
    distanceFromWarehouse: ''
  });

  const [errors, setErrors] = useState({
    customerName: '',
    customerLocation: '',
    distanceFromWarehouse: ''
  });

  const validateField = (name, value) => {
    let error = '';
    const lettersAndSpaces = /^[A-Za-z\s]*$/;

    if ((name === 'customerName' || name === 'customerLocation') && !lettersAndSpaces.test(value)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {
      customerName: validateField('customerName', formData.customerName),
      customerLocation: validateField('customerLocation', formData.customerLocation),
      distanceFromWarehouse: validateField('distanceFromWarehouse', formData.distanceFromWarehouse)
    };

    if (newErrors.customerName || newErrors.customerLocation || newErrors.distanceFromWarehouse) {
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log(formData); // Log form data to console
      // Reset the form
      setFormData({
        customerName: '',
        customerLocation: '',
        distanceFromWarehouse: ''
      });
      setErrors({
        customerName: '',
        customerLocation: '',
        distanceFromWarehouse: ''
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <MiniDrawer />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Customer Management Form</Typography>
        <Card style={{ width: '70%', margin: '0 auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Customer Name:</Typography>
            <TextField
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
            <Typography variant="subtitle1" gutterBottom>Customer Location:</Typography>
            <TextField
              type="text"
              name="customerLocation"
              value={formData.customerLocation}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.customerLocation}
              helperText={errors.customerLocation}
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
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerManagementForm;
