import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from '../Navbar';
import { styled } from '@mui/system';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  padding: '20px',
  color: '#edf6f9',
}));

const CustomerManagementForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    distanceFromWarehouse: ''
  });

  const [errors, setErrors] = useState({
    customerName: '',
    location: '',
    distanceFromWarehouse: ''
  });

  const validateField = (name, value) => {
    let error = '';
    const lettersAndSpaces = /^[A-Za-z\s]*$/;

    if ((name === 'customerName' || name === 'location') && !lettersAndSpaces.test(value)) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to console
    console.log(formData);

    // Send a POST request to the backend API
    const url = 'http://localhost:8060/customers'; 
    const requestData = { ...formData };

    try {
      const response = await axios.post(url, requestData);
      console.log('Data submitted successfully:', response.data);
     // Reset the form
      setFormData({
        customerName: '',
        location: '',
        distanceFromWarehouse: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px',backgroundImage: 'linear-gradient(135deg, #1b263b,#caf0f8)' }}>
      
      <Navbar/>
      <form onSubmit={handleSubmit} >
        <br />
        <br />
        <Typography variant='h2'  color='#caf0f8' fontWeight={1000} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Customer Management Form</Typography>
        <GlassCard style={{ width: '70%', margin: '2rem auto',color:'#1b263b' }}>
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
              inputProps={{ style: { color: '#000' } }}
              InputLabelProps={{ style: { color: '#000' } }}
            />
            <Typography variant="subtitle1" gutterBottom>Customer Location:</Typography>
            <TextField
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.location}
              helperText={errors.location}
              inputProps={{ style: { color: '#000' } }}
              InputLabelProps={{ style: { color: '#000' } }}
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
              inputProps={{ step: "0.01", min: "0.01" ,color:'#000'}} // Ensure input accepts decimal values
              InputLabelProps={{ style: { color: '#000' } }}
            />
          </CardContent>
        </GlassCard>
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
    </div>
  );
};

export default CustomerManagementForm;
