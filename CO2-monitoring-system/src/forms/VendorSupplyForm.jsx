import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import MiniDrawer from '../MiniDrawer';
import axios from 'axios';

const VendorSupplyForm = () => {
  const [formData, setFormData] = useState({
    vendorId: '',
    vehicleId: '',
    fuelConsumption: '',
    supplyItems: [{ productName: '', quantity: '' }]
  });

  const [vendors, setVendors] = useState([]);
  const [supplyItems, setSupplyItems] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch vendors from backend
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8050/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    // Fetch vehicles from backend
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8040/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    // Fetch supply items for selected vendor
    const fetchSupplyItems = async () => {
      if (formData.vendorId) {
        try {
          const response = await axios.get(`http://localhost:8050/vendors/${formData.vendorId}`);
          setSupplyItems(response.data.vendorProducts);
        } catch (error) {
          console.error('Error fetching supply items:', error);
        }
      } else {
        setSupplyItems([]);
      }
    };
    fetchSupplyItems();
  }, [formData.vendorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSupplyItemChange = (index, e) => {
    const { name, value } = e.target;

    const updatedSupplyItems = [...formData.supplyItems];
    updatedSupplyItems[index][name] = value;

    setFormData({
      ...formData,
      supplyItems: updatedSupplyItems
    });
  };

  const handleAddSupplyItem = () => {
    setFormData({
      ...formData,
      supplyItems: [...formData.supplyItems, { productName: '', quantity: '' }]
    });
  };

  const handleRemoveSupplyItem = (index) => {
    const updatedSupplyItems = [...formData.supplyItems];
    updatedSupplyItems.splice(index, 1);

    setFormData({
      ...formData,
      supplyItems: updatedSupplyItems
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      // Send form data to backend API
      await axios.post('http://localhost:8070/supplies', formData);
      console.log('Form data submitted successfully');
      // Reset the form
      setFormData({
        vendorId: '',
        vehicleId: '',
        fuelConsumption: '',
        supplyItems: [{ productName: '', quantity: '' }]
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
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
            <FormControl fullWidth required>
              <InputLabel>Vendor Name</InputLabel>
              <Select
                name="vendorId"
                value={formData.vendorId}
                onChange={handleInputChange}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.vendorName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Vehicle ID</InputLabel>
              <Select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleInputChange}
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.id} - {vehicle.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="subtitle1" gutterBottom>Fuel Consumption (liters):</Typography>
            <TextField
              type="number"
              name="fuelConsumption"
              value={formData.fuelConsumption}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <hr />
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Supplied Items</Typography>
            {formData.supplyItems.map((supplyItem, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <FormControl fullWidth required style={{ marginBottom: '0.5rem' }}>
                  <InputLabel>Product Name</InputLabel>
                  <Select
                    name="productName"
                    value={supplyItem.productName}
                    onChange={(e) => handleSupplyItemChange(index, e)}
                  >
                    {supplyItems.map((item) => (
                      <MenuItem key={item.productionMatrix.id} value={item.productName}>
                        {item.productName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  name="quantity"
                  value={supplyItem.quantity}
                  onChange={(e) => handleSupplyItemChange(index, e)}
                  fullWidth
                  required
                  placeholder={`Quantity ${index + 1}`}
                />
                <Button type="button" onClick={() => handleRemoveSupplyItem(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddSupplyItem}>Add Item</Button>
          </CardContent>
        </Card>
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

export default VendorSupplyForm;
