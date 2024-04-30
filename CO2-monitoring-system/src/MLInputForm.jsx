import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Select, MenuItem, Button, Typography } from '@mui/material';





const MLInputForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    vehicleId: null,
    fuelType: '',
    fuelConsumption: null,
    transportationType: '',
    vendor: '',
    transportInventoryList: [{ productName: '', quantity: '' }]
  });

  const handleMainInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'fuelConsumption' || name === 'vehicleId' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };

  const handleProductInputChange = (index, e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'quantity' ? parseInt(value, 10) : value;
    const updatedProducts = [...formData.transportInventoryList];
    updatedProducts[index][name] = parsedValue;
    setFormData({
      ...formData,
      transportInventoryList: updatedProducts
    });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      transportInventoryList: [...formData.transportInventoryList, { productName: '', quantity: '' }]
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.transportInventoryList];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      transportInventoryList: updatedProducts
    });
  };

  //start

  //Uncomment following comment to send post requests

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await fetch('http://your-backend-api.com/submit-form', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //         body: JSON.stringify({
  //         date: formData.date,
  //         vehicleId: formData.vehicleId,
  //         fuelType: formData.fuelType,
  //         fuelConsumption: formData.fuelConsumption,
  //         transportationType: formData.transportationType,
  //         vendor: formData.vendor,
  //         transportInventoryList: formData.transportInventoryList
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit form');
  //     }

  //     // Reset the form data after successful submission
  //     setFormData({
  //       date: '',
  //       vehicleId: null,
  //       fuelType: '',
  //       fuelConsumption: null,
  //       transportationType: '',
  //       vendor: '',
  //       transportInventoryList: [{ productName: '', quantity: null }]
  //     });

  //     console.log('Form submitted successfully');
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  // end
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log the payload to the console
    console.log({
      date: formData.date,
      vehicleId: formData.vehicleId,
      fuelType: formData.fuelType,
      fuelConsumption: formData.fuelConsumption,
      transportationType: formData.transportationType,
      vendor: formData.vendor,
      transportInventoryList: formData.transportInventoryList
    });
    
    // Reset the form
    setFormData({
      date: '',
      vehicleId: '',
      fuelType: '',
      fuelConsumption: '',
      transportationType: '',
      vendor: '',
      transportInventoryList: [{ productName: '', quantity: '' }]
    });
  };
  
  return (
    <div style={{minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px'  }}>
      <form onSubmit={handleSubmit} >
      <Typography variant='h2'marginTop={1} marginBottom={3} color='#78909c' >Transportation data input form</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card style={{ height: '98%' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" gutterBottom>Date:</Typography>
                <TextField
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleMainInputChange}
                  fullWidth
                  required
                />
                <Typography variant="subtitle1" gutterBottom>Vehicle ID:</Typography>
                <TextField
                  placeholder='Enter vehicle ID'
                  type="number"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleMainInputChange}
                  fullWidth
                  required
                />
                <Typography variant="subtitle1" gutterBottom>Fuel Type:</Typography>
                <Select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleMainInputChange}
                  fullWidth
                  placeholder="Select fuel type"
                  required
                >
                  <MenuItem value="X">X=regular gasoline</MenuItem>
                  <MenuItem value="Z">Z=premium gasoline</MenuItem>
                  <MenuItem value="D">diesel</MenuItem>
                  <MenuItem value="E">ethanol(E85)</MenuItem>
                  <MenuItem value="N">X=natural gas</MenuItem>
                </Select>
                <Typography variant="subtitle1" gutterBottom>Fuel Consumption:</Typography>
                <TextField
                  type="number"
                  name="fuelConsumption"
                  value={formData.fuelConsumption}
                  onChange={handleMainInputChange}
                  fullWidth
                  placeholder="Enter fuel consumption"
                  required
                />
                <Typography variant="subtitle1" gutterBottom>Transportation Type:</Typography>
                <Select
                  name="transportationType"
                  value={formData.transportationType}
                  onChange={handleMainInputChange}
                  fullWidth
                  placeholder="Select transportation type"
                  required
                >
                  <MenuItem value="INBOUND">INBOUND</MenuItem>
                  <MenuItem value="OUTBOUND">OUTBOUND</MenuItem>
                </Select>
                {formData.transportationType === 'INBOUND' && (
                  <React.Fragment>
                    <Typography variant="subtitle1" gutterBottom>Vendor:</Typography>
                    <Select
                      name="vendor"
                      value={formData.vendor}
                      onChange={handleMainInputChange}
                      fullWidth
                      placeholder="Select vendor"
                      required
                    >
                      <MenuItem value="Butcher">Butcher</MenuItem>
                      <MenuItem value="Vendor1">Vendor1</MenuItem>
                      <MenuItem value="Vendor2">Vendor2</MenuItem>
                      <MenuItem value="Vendor3">Vendor3</MenuItem>
                    </Select>
                  </React.Fragment>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card style={{ height: 'fit-content' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <hr />
                <Typography variant="h5" style={{ marginBottom: '1rem' }}>Transport Inventory List</Typography>
                {formData.transportInventoryList.map((product, index) => (
                  <div key={index}>
                    <Typography variant="subtitle1" gutterBottom>Product Name:</Typography>
                    <Select
                      name="productName"
                      value={product.productName}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      placeholder="Select product name"
                      required
                    >
                      <MenuItem value="SheepMeat">SheepMeat</MenuItem>
                      <MenuItem value="BuffaloMeat">BuffaloMeat</MenuItem>
                      <MenuItem value="Milk">Milk</MenuItem>
                      <MenuItem value="Cheese">Cheese</MenuItem>
                    </Select>
                    <Typography variant="subtitle1" gutterBottom>Quantity:</Typography>
                    <TextField
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      placeholder="Enter quantity"
                      required
                    />
                    <Button type="button" onClick={() => handleRemoveProduct(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" onClick={handleAddProduct}>Add Product</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button type="submit" variant='contained' color='primary' fullWidth>Submit</Button>
      </form>
    </div>
  );
};

export default MLInputForm;
