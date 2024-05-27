import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Select, MenuItem, Button, Typography } from '@mui/material';
import MiniDrawer from './MiniDrawer';

const VehicleManagementForm = () => {
  const [formData, setFormData] = useState({
    vehicleModel: '',
    engineSize: '',
    numberOfCylinders: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log form data to console
    // Reset the form
    setFormData({
      vehicleModel: '',
      engineSize: '',
      numberOfCylinders: '',
      vehicleType: '',
      transmission: '',
      capacity: '',
      fuelType: '',
    });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <MiniDrawer />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Vehicle Management Form</Typography>
        <Card style={{ width: '70%', margin: '0 auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Vehicle Model:</Typography>
            <TextField
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
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
              name="numberOfCylinders"
              value={formData.numberOfCylinders}
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
              <MenuItem value="Petrol">Petrol</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="Electric">Electric</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleManagementForm;
