import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Select, MenuItem, Button, Typography } from '@mui/material';

const CarbonEmissionEvaluationForm = () => {
  const [formData, setFormData] = useState({
    carbonEmissionJobName: '',
    customer: '',
    vehicle: '',
    shipmentProductCatalog: [{
      vendor: '',
      product: '',
      quantity: '' // Add quantity field
    }]
  });

  const handleMainInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProductInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.shipmentProductCatalog];
    updatedProducts[index][name] = value;
    setFormData({
      ...formData,
      shipmentProductCatalog: updatedProducts
    });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      shipmentProductCatalog: [...formData.shipmentProductCatalog, { vendor: '', product: '', quantity: '' }] // Include quantity field
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.shipmentProductCatalog];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      shipmentProductCatalog: updatedProducts
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log form data to console
    // Reset the form
    setFormData({
      carbonEmissionJobName: '',
      customer: '',
      vehicle: '',
      shipmentProductCatalog: [{ vendor: '', product: '', quantity: '' }] // Reset quantity field
    });
  };
  
  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Carbon Emission Evaluation Form</Typography>
        <Card style={{ width: '70%',  margin: '0 auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Carbon Emission Job Name:</Typography>
            <TextField
              type="text"
              name="carbonEmissionJobName"
              value={formData.carbonEmissionJobName}
              onChange={handleMainInputChange}
              fullWidth
              required
            />
            <Typography variant="subtitle1" gutterBottom>Customer:</Typography>
            <Select
              name="customer"
              value={formData.customer}
              onChange={handleMainInputChange}
              fullWidth
              required
            >
              <MenuItem value="Customer1">Customer1</MenuItem>
              <MenuItem value="Customer2">Customer2</MenuItem>
              <MenuItem value="Customer3">Customer3</MenuItem>
            </Select>
            <Typography variant="subtitle1" gutterBottom>Vehicle:</Typography>
            <Select
              name="vehicle"
              value={formData.vehicle}
              onChange={handleMainInputChange}
              fullWidth
              required
            >
              <MenuItem value="Vehicle1">Vehicle1</MenuItem>
              <MenuItem value="Vehicle2">Vehicle2</MenuItem>
              <MenuItem value="Vehicle3">Vehicle3</MenuItem>
            </Select>
            <hr />
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Shipment Product Catalog</Typography>
            {formData.shipmentProductCatalog.map((product, index) => (
              <div key={index}>
                <Typography variant="subtitle1" gutterBottom>Vendor:</Typography>
                <Select
                  name="vendor"
                  value={product.vendor}
                  onChange={(e) => handleProductInputChange(index, e)}
                  fullWidth
                  required
                >
                  <MenuItem value="Vendor1">Vendor1</MenuItem>
                  <MenuItem value="Vendor2">Vendor2</MenuItem>
                  <MenuItem value="Vendor3">Vendor3</MenuItem>
                </Select>
                <Typography variant="subtitle1" gutterBottom>Product:</Typography>
                <Select
                  name="product"
                  value={product.product}
                  onChange={(e) => handleProductInputChange(index, e)}
                  fullWidth
                  required
                >
                  <MenuItem value="Product1">Product1</MenuItem>
                  <MenuItem value="Product2">Product2</MenuItem>
                  <MenuItem value="Product3">Product3</MenuItem>
                </Select>
                <Typography variant="subtitle1" gutterBottom>Quantity:</Typography>
                <TextField
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleProductInputChange(index, e)}
                  fullWidth
                  required
                />
                <Button type="button" onClick={() => handleRemoveProduct(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddProduct}>Add Product</Button>
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default CarbonEmissionEvaluationForm;
