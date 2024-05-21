import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import MiniDrawer from './MiniDrawer';

const CustomerManagementForm = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerLocation: '',
    distanceFromWarehouse: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log form data to console
    // Reset the form
    setFormData({
      customerId: '',
      customerName: '',
      customerLocation: '',
      distanceFromWarehouse: ''
    });
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
            <Typography variant="subtitle1" gutterBottom>Customer Id:</Typography>
            <TextField
              type="number"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Customer Name:</Typography>
            <TextField
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Customer Location:</Typography>
            <TextField
              type="text"
              name="customerLocation"
              value={formData.customerLocation}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Distance from Sysco warehouse (km):</Typography>
            <TextField
              type="number"
              name="distanceFromWarehouse"
              value={formData.distanceFromWarehouse}
              onChange={handleInputChange}
              fullWidth
              required
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
