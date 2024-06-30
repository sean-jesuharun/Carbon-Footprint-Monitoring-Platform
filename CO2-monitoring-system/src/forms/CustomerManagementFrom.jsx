import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import BackDrop from '../BackDrop';
import Navbar from '../Navbar';

const CustomerManagementForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    distanceFromWarehouse: ''
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
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSnackbarMessage('');

    try {
      await axiosInstance.post('/customers', formData);
      setSnackbarMessage('Customer details submitted successfully!');
      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestError = (error, serviceName = null) => {
    let errorMessage = 'An error occurred while processing your request.';
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        errorMessage = error.response.data.errors.map((err) => err.message).join(', ');
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    }
    setError(serviceName ? `${serviceName}: ${errorMessage}` : errorMessage);
    setErrorOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
    setErrorOpen(false);
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      location: '',
      distanceFromWarehouse: ''
    });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Navbar />
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <br />
        <br />
        <Typography variant='h3' color='#5D6259' fontWeight={1000} sx={{ textAlign: 'center' }}>
          Customer Management Form
        </Typography>
        <Card style={{ width: '60%', margin: '2rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
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

export default CustomerManagementForm;
