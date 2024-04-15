import React, { useState } from 'react';
import './MLInputForm.css'; // Import CSS file for styling

const MLInputForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    fuelType: '',
    fuelConsumption: '',
    transportationType: '',
    vendor: '',
    ProductList: [{ productName: '', quantity: '' }]
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
    const updatedProducts = [...formData.ProductList];
    updatedProducts[index][name] = value;
    setFormData({
      ...formData,
      ProductList: updatedProducts
    });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      ProductList: [...formData.ProductList, { productName: '', quantity: '' }]
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.ProductList];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      ProductList: updatedProducts
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleMainInputChange}
      />
      <br />
      <label>Fuel Type:</label>
      <select
        name="fuelType"
        value={formData.fuelType}
        onChange={handleMainInputChange}
      >
        <option value="X">X=regular gasoline</option>
        <option value="Z">Z=premium gasoline</option>
        <option value="D">diesel</option>
        <option value="E">ethanol(E85)</option>
        <option value="N">X=natural gas</option>
        {/* Add other fuel types as options */}
      </select>
      <br />
      <label>Fuel Consumption:</label>
      <input
        type="number"
        name="fuelConsumption"
        value={formData.fuelConsumption}
        onChange={handleMainInputChange}
      />
      <br />
      <label>Transportation Type:</label>
      <select
        name="transportationType"
        value={formData.transportationType}
        onChange={handleMainInputChange}
      >
        <option value="INBOUND">INBOUND</option>
        <option value="OUTBOUND">OUTBOUND</option>
      </select>
      <br />
      {formData.transportationType === 'INBOUND' && (
        <>
          <label>Vendor:</label>
          <select
            name="vendor"
            value={formData.vendor}
            onChange={handleMainInputChange}
          >
            <option value="Butcher">Butcher</option>
            {/* Add other vendors as options */}
          </select>
          <br />
        </>
      )}
      <hr />
      <h3>Product List</h3>
      {formData.ProductList.map((product, index) => (
        <div key={index}>
          <label>Product Name:</label>
          <select
            name="productName"
            value={product.productName}
            onChange={(e) => handleProductInputChange(index, e)}
          >
            <option value="SheepMeat">SheepMeat</option>
            <option value="BuffaloMeat">BuffaloMeat</option>
            {/* Add other product names as options */}
          </select>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={(e) => handleProductInputChange(index, e)}
          />
          <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>
        Add Product
      </button>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MLInputForm;
