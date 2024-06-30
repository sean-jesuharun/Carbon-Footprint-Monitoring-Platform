import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Select, MenuItem, Button, Typography, Snackbar, Alert, FormControl, InputLabel } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../Navbar';
import BackDrop from '../BackDrop';

const VehicleManagementForm = () => {
  const [formData, setFormData] = useState({
    model: '',
    engineSize: '',
    cylinders: '',
    vehicleType: '',
    transmission: '',
    capacity: '',
    fuelType: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'cylinders':
        if (/^\d*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'engineSize':
        if (/^\d*\.?\d*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      default:
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSnackbarMessage('');

    try {
      await axiosInstance.post('/vehicles', formData);
      setSnackbarMessage('Vehicle details submitted successfully!');
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
      model: '',
      engineSize: '',
      cylinders: '',
      vehicleType: '',
      transmission: '',
      capacity: '',
      fuelType: '',
    });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h3' color='#5D6259' fontWeight={1000} sx={{ textAlign: 'center' }}>
          Vehicle Management Form
        </Typography>
        <Card style={{ width: '70%', margin: '2rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert severity="error" onClose={handleSnackbarClose}>
                {error}
              </Alert>
            </Snackbar>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert severity="success" onClose={handleSnackbarClose}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Vehicle Model" name="model" value={formData.model} onChange={handleInputChange} fullWidth required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  label="Engine Size"
                  name="engineSize"
                  value={formData.engineSize}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  label="Number of Cylinders"
                  name="cylinders"
                  value={formData.cylinders}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  label="Vehicle Type"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  label="Transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Fuel Type</InputLabel>
                  <Select name="fuelType" value={formData.fuelType} onChange={handleInputChange}>
                    <MenuItem value="X">Regular Gasoline</MenuItem>
                    <MenuItem value="D">Diesel</MenuItem>
                    <MenuItem value="E">Ethanol</MenuItem>
                    <MenuItem value="Z">Premium Gasoline</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
              }
            }}
          >
            Submit
          </Button>
        </div>
      </form>
      <BackDrop open={loading} handleClose={() => setLoading(false)} />
    </div>
  );
};

export default VehicleManagementForm;
