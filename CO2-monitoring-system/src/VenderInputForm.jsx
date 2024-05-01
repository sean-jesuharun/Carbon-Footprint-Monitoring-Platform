import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Button, Typography, MenuItem, Select } from '@mui/material';

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
            <Card style={{ height: 'fix'}}>
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                {formData.supplyProductDetailList.map((product, index) => (
                  <div key={index}>
                    <Typography variant="h6" style={{ marginTop: '0.5px' }}>Product Detail {index + 1}</Typography>
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
                    <Select
                      name="region"
                      value={product.region}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      required
                    >
                      <MenuItem value="Global">Global</MenuItem>
                      <MenuItem value="East Asia and Southeast Asia">East Asia and Southeast Asia</MenuItem>
                      <MenuItem value="Eastern Europe">Eastern Europe</MenuItem>
                      <MenuItem value="Latin America and the Caribbean">Latin America and the Caribbean</MenuItem>
                      <MenuItem value="Near East and North Africa">Near East and North Africa</MenuItem>
                      <MenuItem value="North America">North America</MenuItem>
                      <MenuItem value="Oceania">Oceania</MenuItem>
                      <MenuItem value="Russian Federation">Russian Federation</MenuItem>
                      <MenuItem value="South Asia">South Asia</MenuItem>
                      <MenuItem value="Sub-Saharan Africa">Sub-Saharan Africa</MenuItem>
                      <MenuItem value="Western Europe">Western Europe</MenuItem>
                    </Select>
                    <Typography variant="subtitle1" gutterBottom>Animal Species:</Typography>
                    <Select
                      name="animalSpecies"
                      value={product.animalSpecies}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      required
                    >
                      <MenuItem value="Cattle">Cattle</MenuItem>
                      <MenuItem value="Buffaloes">Buffaloes</MenuItem>
                      <MenuItem value="Sheep">Sheep</MenuItem>
                      <MenuItem value="Goats">Goats</MenuItem>
                      <MenuItem value="Pigs">Pigs</MenuItem>
                      <MenuItem value="Chicken">Chicken</MenuItem>
                    </Select>
                    <Typography variant="subtitle1" gutterBottom>Production System:</Typography>
                    <Select
                      name="productionSystem"
                      value={product.productionSystem}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      required
                    >
                      <MenuItem value="Aggregated">Aggregated</MenuItem>
                      <MenuItem value="Grassland systems">Grassland systems</MenuItem>
                      <MenuItem value="Feedlots">Feedlots</MenuItem>
                      <MenuItem value="Mixed systems">Mixed systems</MenuItem>
                      <MenuItem value="Backyard systems">Backyard systems</MenuItem>
                      <MenuItem value="Intermediate systems">Intermediate systems</MenuItem>
                      <MenuItem value="Industrial systems">Industrial systems</MenuItem>
                      <MenuItem value="Layers">Layers</MenuItem>
                      <MenuItem value="Broilers">Broilers</MenuItem>
                    </Select>
                    <Typography variant="subtitle1" gutterBottom>Commodity:</Typography>
                    <Select 
                      name="commodity"
                      value={product.commodity}
                      onChange={(e) => handleProductInputChange(index, e)}
                      fullWidth
                      required
                    >
                      <MenuItem value="Aggregated">Aggregated</MenuItem>
                      <MenuItem value="Milk">Milk</MenuItem>
                      <MenuItem value="Meat">Meat</MenuItem>
                      <MenuItem value="Eggs">Eggs</MenuItem>
                    </Select>
                    <Button type="button" onClick={() => handleRemoveProduct(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" onClick={handleAddProduct}>Add Product Detail</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center',marginTop:'5px' }}>
  <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
</div>

      </form>
    </div>
  );
};

export default VendorInputForm;
