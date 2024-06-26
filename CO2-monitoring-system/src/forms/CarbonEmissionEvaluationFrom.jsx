import React, { useState, useEffect } from 'react';
import { Grid,Card, CardContent, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    jobName: '',
    customerId: '',
    vehicleId: '',
    fuelConsumption: '',
    deliveryItems: [{ vendorId: '', productName: '', quantity: '' }]
  });

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    // Fetch customers from backend
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8060/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
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
    // Fetch products for each vendor when its vendorId changes
    const fetchProductsForVendors = async () => {
      const productsMap = {};

      for (const item of formData.deliveryItems) {
        if (item.vendorId && !productsMap[item.vendorId]) {
          try {
            const response = await axios.get(`http://localhost:8050/vendors/${item.vendorId}`);
            productsMap[item.vendorId] = response.data.vendorProducts;
          } catch (error) {
            console.error(`Error fetching products for vendor ${item.vendorId}:`, error);
          }
        }
      }

      setProducts(productsMap);
    };

    fetchProductsForVendors();
  }, [formData.deliveryItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDeliveryItemChange = (index, e) => {
    const { name, value } = e.target;

    const updatedDeliveryItems = [...formData.deliveryItems];
    updatedDeliveryItems[index][name] = value;

    setFormData({
      ...formData,
      deliveryItems: updatedDeliveryItems
    });
  };

  const handleAddDeliveryItem = () => {
    setFormData({
      ...formData,
      deliveryItems: [...formData.deliveryItems, { vendorId: '', productName: '', quantity: '' }]
    });
  };

  const handleRemoveDeliveryItem = (index) => {
    const updatedDeliveryItems = [...formData.deliveryItems];
    updatedDeliveryItems.splice(index, 1);

    setFormData({
      ...formData,
      deliveryItems: updatedDeliveryItems
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      // Send form data to backend API
      await axios.post('http://localhost:8070/evaluations', formData);
      console.log('Form data submitted successfully');
      // Reset the form
      setFormData({
        jobName: '',
        customerId: '',
        vehicleId: '',
        fuelConsumption: '',
        deliveryItems: [{ vendorId: '', productName: '', quantity: '' }]
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' ,backgroundImage: 'linear-gradient(135deg, #1b263b,#caf0f8)' }}>
    
      <Navbar/>
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' color='#caf0f8' fontWeight={1000} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Carbon Emission Evaluation Form</Typography>
        <GlassCard style={{ width: '70%', margin: '2rem auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
          <Grid item xs={12} md={6}>

            <TextField
              label="Job Name"
              name="jobName"
              value={formData.jobName}
              onChange={handleInputChange}
              fullWidth
              required
            />

           </Grid>

           <Grid item xs={12} md={6}>

            <FormControl fullWidth required>
              <InputLabel>Customer Name</InputLabel>
              <Select
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.customerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>

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

            </Grid>
            
            <Grid item xs={12} md={6}>

            <TextField
              type="number"
              name="fuelConsumption"
              value={formData.fuelConsumption}
              onChange={handleInputChange}
              fullWidth
              required
              label="Fuel Consumption (liters)"

            />
            </Grid>
            <hr />
             
            </Grid>


            <Typography variant="h5" style={{ marginBottom: '1rem',color:'#1b263b' }}>Delivery Items</Typography>
            {formData.deliveryItems.map((deliveryItem, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
              <Grid container spacing={3}>
              <Grid item xs={12} md={4}>

                <FormControl fullWidth required style={{ marginBottom: '0.5rem' }}>
                  <InputLabel>Vendor Name</InputLabel>
                  <Select
                    name="vendorId"
                    value={deliveryItem.vendorId}
                    onChange={(e) => handleDeliveryItemChange(index, e)}
                  >
                    {vendors.map((vendor) => (
                      <MenuItem key={vendor.id} value={vendor.id}>
                        {vendor.vendorName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>

                <FormControl fullWidth required style={{ marginBottom: '0.5rem' }}>
                  <InputLabel>Product Name</InputLabel>
                  <Select
                    name="productName"
                    value={deliveryItem.productName}
                    onChange={(e) => handleDeliveryItemChange(index, e)}
                  >
                    {(products[deliveryItem.vendorId] || []).map((product) => (
                      <MenuItem key={product.id} value={product.productName}>
                        {product.productName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>

                <TextField
                  type="number"
                  name="quantity"
                  value={deliveryItem.quantity}
                  onChange={(e) => handleDeliveryItemChange(index, e)}
                  fullWidth
                  required
                  placeholder={`Quantity ${index + 1}`}
                />
            </Grid>
         </Grid>

                <Button type="button" onClick={() => handleRemoveDeliveryItem(index)} style={{backgroundColor:'#1b263b',color:'#fff',margin:'0.5rem'}} >Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddDeliveryItem} style={{backgroundColor:'#1b263b',color:'#fff'}}>Add Item</Button>
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

export default DeliveryForm;
