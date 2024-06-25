import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Navbar from '../Navbar';

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

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message state

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

    console.log(formData);

    const url = 'http://localhost:8060/customers'; 
    const requestData = { ...formData };

    try {
      const response = await axios.post(url, requestData);
      console.log('Data submitted successfully:', response.data);

      // Show success snackbar
      setSnackbarMessage('Customer details submitted successfully!');
      setSnackbarOpen(true);

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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <Navbar/>
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
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button 
            type="submit" 
            variant='contained' 
            sx={{ 
              padding: '10px 20px', 
              color: '#fff', 
              backgroundColor: '#1b263b',
              '&:hover': {
                backgroundColor: '#778da9',
              },
            }}
          >
            Submit
          </Button>
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomerManagementForm;
