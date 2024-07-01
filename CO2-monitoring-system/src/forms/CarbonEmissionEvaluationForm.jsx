import React, { useState, useEffect } from 'react';
import { Grid,Card,CardContent,TextField,Button,Typography,Select,MenuItem,FormControl,InputLabel,Snackbar,Alert} from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../Navbar';
import BackDrop from '../BackDrop';

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
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);


  useEffect(() => {
    fetchCustomers();
    fetchVehicles();
    fetchVendors();
  }, []);

  useEffect(() => {
    fetchProductsForVendors();
  }, [formData.deliveryItems]);

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      handleFetchError(error, 'Fetching Customers');
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axiosInstance.get('/vehicles');
      setVehicles(response.data);
    } catch (error) {
      handleFetchError(error, 'Fetching Vehicles');
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axiosInstance.get('/vendors');
      setVendors(response.data);
    } catch (error) {
      handleFetchError(error, 'Fetching Vendors');
    }
  };

  const fetchProductsForVendors = async () => {
    const productsMap = {};

    for (const item of formData.deliveryItems) {
      if (item.vendorId && !productsMap[item.vendorId]) {
        try {
          const response = await axiosInstance.get(`/vendors/${item.vendorId}`);
          productsMap[item.vendorId] = response.data.vendorProducts;
        } catch (error) {
          handleFetchError(error, `Fetching Products for Vendor ${item.vendorId}`);
        }
      }
    }

    setProducts(productsMap);
  };

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
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axiosInstance.post('/evaluations', formData);
      setSuccess('Form data submitted successfully');
      resetForm();
      setSuccessOpen(true);

    } catch (error) {
      handleRequestError(error);
    }finally{
      setLoading(false);

    }
  };

  const handleFetchError = (error, serviceName) => {
    console.error(`Error fetching ${serviceName}:`, error);
    handleRequestError(error, serviceName);
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
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
    setSuccessOpen(false);

  };

  const resetForm = () => {
    setFormData({
      jobName: '',
      customerId: '',
      vehicleId: '',
      fuelConsumption: '',
      deliveryItems: [{ vendorId: '', productName: '', quantity: '' }]
    });
    setError(null);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h3' color='#5D6259' fontWeight={1000}>
          Carbon Emission Evaluation Form
        </Typography>
        <Card style={{ width: '100%', margin: '2rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert severity="error" onClose={handleSnackbarClose}>
                {error}
              </Alert>
            </Snackbar>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert severity="success" onClose={handleSnackbarClose}>
                {success}
              </Alert>
            </Snackbar>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Job Name" name="jobName" value={formData.jobName} onChange={handleInputChange} fullWidth required />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Customer Name</InputLabel>
                  <Select name="customerId" value={formData.customerId} onChange={handleInputChange}>
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
                  <Select name="vehicleId" value={formData.vehicleId} onChange={handleInputChange}>
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
                  inputProps={{
                    inputMode: 'numeric'  // Specify inputMode
                  }}
                />
              </Grid>
              <hr />
            </Grid>
            <Typography variant="h5" style={{ marginBottom: '1rem', color: '#1b263b' }}>
              Delivery Items
            </Typography>
            {formData.deliveryItems.map((deliveryItem, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth required style={{ marginBottom: '0.5rem' }}>
                      <InputLabel>Vendor Name</InputLabel>
                      <Select name="vendorId" value={deliveryItem.vendorId} onChange={(e) => handleDeliveryItemChange(index, e)}>
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
                      placeholder={`Quantity (kg)`}
                      inputProps={{
                        inputMode: 'numeric'  // Specify inputMode
                      }}
                    />
                  </Grid>
                </Grid>
                <Button type="button" onClick={() => handleRemoveDeliveryItem(index)} style={{ backgroundColor: '#198773', color: '#ffffff', margin: '0.5rem' }}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddDeliveryItem} style={{ backgroundColor: '#198773', color: '#ffffff' }}>
              Add Item
            </Button>
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

export default DeliveryForm;
