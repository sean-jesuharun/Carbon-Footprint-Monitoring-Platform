import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import MiniDrawer from '../MiniDrawer';
import axios from 'axios';

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
  const [products, setProducts] = useState([]);

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
    // Fetch products for selected vendor
    const fetchProducts = async () => {
      if (formData.deliveryItems.some(item => item.vendorId)) {
        try {
          const vendorIds = formData.deliveryItems.map(item => item.vendorId);
          const productsResponse = await Promise.all(vendorIds.map(vendorId => axios.get(`http://localhost:8050/vendors/${vendorId}`)));
          const allProducts = productsResponse.map(response => response.data.vendorProducts).flat();
          setProducts(allProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        setProducts([]);
      }
    };
    fetchProducts();
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
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <MiniDrawer />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Delivery Form</Typography>
        <Card style={{ width: '70%', margin: '0 auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Job Name"
              name="jobName"
              value={formData.jobName}
              onChange={handleInputChange}
              fullWidth
              required
            />
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
            />
            <hr />
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Delivery Items</Typography>
            {formData.deliveryItems.map((deliveryItem, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
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
                <FormControl fullWidth required style={{ marginBottom: '0.5rem' }}>
                  <InputLabel>Product Name</InputLabel>
                  <Select
                    name="productName"
                    value={deliveryItem.productName}
                    onChange={(e) => handleDeliveryItemChange(index, e)}
                  >
                    {products.map((product) => (
                      <MenuItem key={product.productionMatrix.id} value={product.productName}>
                        {product.productName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  name="quantity"
                  value={deliveryItem.quantity}
                  onChange={(e) => handleDeliveryItemChange(index, e)}
                  fullWidth
                  required
                  placeholder={`Quantity ${index + 1}`}
                />
                <Button type="button" onClick={() => handleRemoveDeliveryItem(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddDeliveryItem}>Add Item</Button>
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
