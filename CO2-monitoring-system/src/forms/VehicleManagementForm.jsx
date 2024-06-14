import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Select, MenuItem, Button, Typography } from '@mui/material';
import MiniDrawer from '../MiniDrawer';
import axios from 'axios';
import Navbar from '../Navbar';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to console
    console.log(formData);

    // Send a POST request to the backend API
    const url = 'http://localhost:8040/vehicles'; 
    const requestData = { ...formData };

    try {
      const response = await axios.post(url, requestData);
      console.log('Data submitted successfully:', response.data);
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

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      {/* <MiniDrawer /> */}
      <Navbar/>
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Vehicle Management Form</Typography>
        <Card style={{ width: '70%', margin: '0 auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Vehicle Model:</Typography>
            <TextField
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Engine Size:</Typography>
            <TextField
              type="number"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Number of Cylinders:</Typography>
            <TextField
              type="number"
              name="cylinders"
              value={formData.cylinders}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Vehicle Type:</Typography>
            <TextField
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Transmission:</Typography>
            <TextField
              type="text"
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Capacity:</Typography>
            <TextField
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              fullWidth
              required
            />
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
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' sx={{ 
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

export default VehicleManagementForm;
