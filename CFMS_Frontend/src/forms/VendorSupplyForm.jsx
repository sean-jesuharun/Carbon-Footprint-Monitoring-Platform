import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, Grid } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../Navbar';
import BackDrop from '../BackDrop';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';

const VendorSupplyForm = () => {
  const [formData, setFormData] = useState({
    vendorId: '',
    vehicleId: '',
    fuelConsumption: '',
    supplyItems: [{ productName: '', quantity: '' }],
    date: dayjs(),
  });

  const [vendors, setVendors] = useState([]);
  const [supplyItems, setSupplyItems] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    // Fetch vendors
    const fetchVendors = async () => {
      try {
        const response = await axiosInstance.get('/vendors');
        setVendors(response.data);
      } catch (error) {
        handleRequestError(error, 'Fetching Vendors');
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    // Fetch vehicles
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get('/vehicles');
        setVehicles(response.data);
      } catch (error) {
        handleRequestError(error, 'Fetching Vehicles');
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    // Fetch supply items for selected vendor
    const fetchSupplyItems = async () => {
      if (formData.vendorId) {
        try {
          const response = await axiosInstance.get(`/vendors/${formData.vendorId}`);
          setSupplyItems(response.data.vendorProducts);
        } catch (error) {
          handleRequestError(error, `Fetching Supply Items for Vendor ${formData.vendorId}`);
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
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Convert date to desired format before sending
      const formattedData = {
        ...formData,
        date: formData.date.format('YYYY-MM-DDTHH:mm:ssZ')
      };

      console.log(formattedData);
      await axiosInstance.post('/supplies', formattedData);
      setSuccess('Supply details submitted successfully');
      setSuccessOpen(true);
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
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
    setSuccessOpen(false);
  };

  const resetForm = () => {
    setFormData({
      vendorId: '',
      vehicleId: '',
      fuelConsumption: '',
      supplyItems: [{ productName: '', quantity: '' }],
      date: dayjs(),
    });
  };

  // Create a custom theme for DateTimePicker
    const theme = createTheme({
      palette: {
        primary: {
          main: '#198773', // Change this color to whatever you want
        },
      },
    });


  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '30px', backgroundColor: '#ffffff' }}>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h3' color='#5D6259' fontWeight={1000}>Vendor Supply Form</Typography>
        <Card style={{ width: '100%', margin: '2rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required style={{ marginBottom: '0.5rem' }}>
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  name="fuelConsumption"
                  value={formData.fuelConsumption}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  placeholder="Fuel Consumption (liters)"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date and Time"
                    value={formData.date}
                    onChange={(newValue) => {
                      setFormData({ ...formData, date: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
                </ThemeProvider>
              </Grid>
            </Grid>
            <hr />
            <Typography variant="h5" style={{ marginBottom: '1rem', color: '#1b263b' }}>Supplied Items</Typography>
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
                  placeholder={`Quantity (kg)`}
                  inputProps={{
                    inputMode: 'numeric'
                  }}
                />
                <Button type="button" onClick={() => handleRemoveSupplyItem(index)} style={{ backgroundColor: '#198773', color: '#ffffff', margin: '0.5rem' }}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddSupplyItem} style={{ backgroundColor: '#198773', color: '#ffffff' }}>Add Item</Button>
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
                color: '#198773'
              },
            }}>Submit</Button>
        </div>
      </form>
      
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

      <BackDrop open={loading} handleClose={() => setLoading(false)} />
    </div>
  );
};

export default VendorSupplyForm;
