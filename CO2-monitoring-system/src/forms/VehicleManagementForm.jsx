import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Select, MenuItem, Button, Typography, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import Navbar from '../Navbar';
import { styled } from '@mui/system';



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

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message state

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    //// Validation based on field name
  switch (name) {
    case 'cylinders':
      // Allow only full numbers (integers)
      if (/^\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
      break;
    case 'engineSize':
      // Allow numbers with optional decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
      break;
  
    default:
      setFormData({
        ...formData,
        [name]: value
      });
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
 
    const requestData = { ...formData };

    try {
      const response = await axiosInstance.post('/vehicles', requestData);
      console.log('Data submitted successfully:', response.data);

      // Show success snackbar
      setSnackbarMessage('Vehicle details submitted successfully!');
      setSnackbarOpen(true);

      // Reset the form
      setFormData({
        model: '',
        engineSize: '',
        cylinders: '',
        vehicleType: '',
        transmission: '',
        capacity: '',
        fuelType: '',
      });

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '30px',       backgroundColor:'#ffffff',
    }}>
      
      <Navbar/>
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h3' color='#5D6259' fontWeight={1000} sx={{textAlign:'center'}}>Vehicle Management Form</Typography>
        <Card style={{ width: '70%', margin: '2rem auto',borderRadius:'0.5rem' ,padding:'1rem',border: '10px solid #D5E9E5' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Vehicle Model:</Typography>
            <TextField
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
      
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Engine Size:</Typography>
            <TextField
              type="number"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                inputMode: 'numeric'  // Specify inputMode
              }}
            />
            </Grid>

            <Grid item xs={12} md={6}>

            <Typography variant="subtitle1" gutterBottom>Number of Cylinders:</Typography>
            <TextField
              type="number"
              name="cylinders"
              value={formData.cylinders}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                inputMode: 'numeric'  // Specify inputMode
              }}
            />
            </Grid>

            <Grid item xs={12} md={6}>
             <Typography variant="subtitle1" gutterBottom>Vehicle Type:</Typography>
            <TextField
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              fullWidth
              required
            />
             </Grid>


             <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Transmission:</Typography>
            <TextField
              type="text"
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              fullWidth
              required
            />
            </Grid>
            
            <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Fuel Type:</Typography>
            <Select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              fullWidth
              required
            >
              <MenuItem value="X">Regular Gasoline</MenuItem>
              <MenuItem value="D">Diesel</MenuItem>
              <MenuItem value="E">Ethanol</MenuItem>
              <MenuItem value="Z">Premium Gasoline</MenuItem>
            </Select>
            </Grid>
           
         </Grid>

          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' 
          sx={{ 
          padding: '10px 20px', 
          color: '#ffffff', 
          backgroundColor: '#198773',
          '&:hover': {
            backgroundColor: '#ffffff',
            color:'#198773'
          },
        }}>Submit</Button>
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

export default VehicleManagementForm;
