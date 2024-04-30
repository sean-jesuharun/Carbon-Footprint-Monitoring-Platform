import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';

const VendorInputForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    location: '',
    supplyProductDetailList: [{ productName: '', region: '', animalSpecies: '', productionSystem: '', commodity: '' }]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProductInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.supplyProductDetailList];
    updatedProducts[index][name] = value;
    setFormData({
      ...formData,
      supplyProductDetailList: updatedProducts
    });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      supplyProductDetailList: [...formData.supplyProductDetailList, { productName: '', region: '', animalSpecies: '', productionSystem: '', commodity: '' }]
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.supplyProductDetailList];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      supplyProductDetailList: updatedProducts
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Reset the form
    setFormData({
      vendorName: '',
      location: '',
      supplyProductDetailList: [{ productName: '', region: '', animalSpecies: '', productionSystem: '', commodity: '' }]
    });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Vendors' Data Input Form</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card style={{ height: 'fit-content' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" gutterBottom>Vendor Name:</Typography>
                <TextField
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="Enter vendor name"
                  required
                />
                <Typography variant="subtitle1" gutterBottom>Location:</Typography>
                <TextField
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="Enter location"
                  required
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card style={{ height: 'fit-content' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                {formData.supplyProductDetailList.map((product, index) => (
                  <div key={index}>
                    <Typography variant="h6" style={{ marginTop: '1rem' }}>Product Detail {index + 1}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Product Name:</Typography>
                    <TextField
                      name="productName"
                      value={product.productName}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      placeholder="Enter product name"
                      required
                    />
                    <Typography variant="subtitle1" gutterBottom>Region:</Typography>
                    <TextField
                      name="region"
                      value={product.region}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      placeholder="Enter region"
                      required
                    />
                    <Typography variant="subtitle1" gutterBottom>Animal Species:</Typography>
                    <TextField
                      name="animalSpecies"
                      value={product.animalSpecies}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      placeholder="Enter animal species"
                      required
                    />
                    <Typography variant="subtitle1" gutterBottom>Production System:</Typography>
                    <TextField
                      name="productionSystem"
                      value={product.productionSystem}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      placeholder="Enter production system"
                      required
                    />
                    <Typography variant="subtitle1" gutterBottom>Commodity:</Typography>
                    <TextField
                      name="commodity"
                      value={product.commodity}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      placeholder="Enter commodity"
                      required
                    />
                    <Button type="button" onClick={() => handleRemoveProduct(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" onClick={handleAddProduct}>Add Product Detail</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button type="submit" variant='contained' color='primary' fullWidth>Submit</Button>
      </form>
    </div>
  );
};

export default VendorInputForm;
