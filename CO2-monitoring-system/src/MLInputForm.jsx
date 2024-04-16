import React, { useState } from 'react';
import './MLInputForm.css'; // Import CSS file for styling

const MLInputForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    vehicleId: null, // Added vehicleId property
    fuelType: '',
    fuelConsumption: null,
    transportationType: '',
    vendor: '',
    transportInventoryList: [{ productName: '', quantity: null }]
  });

  const handleMainInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'fuelConsumption' || name === 'vehicleId' ? parseInt(value, 10) : value; // Parse as integer if it's fuelConsumption or vehicleId
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };
  

  const handleProductInputChange = (index, e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'quantity' ? parseInt(value, 10) : value; // Parse as integer if it's quantity
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

  //Uncomment following comment to send post requests

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://your-backend-api.com/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
          date: formData.date,
          vehicleId: formData.vehicleId,
          fuelType: formData.fuelType,
          fuelConsumption: formData.fuelConsumption,
          transportationType: formData.transportationType,
          vendor: formData.vendor,
          transportInventoryList: formData.transportInventoryList
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset the form data after successful submission
      setFormData({
        date: '',
        vehicleId: null,
        fuelType: '',
        fuelConsumption: null,
        transportationType: '',
        vendor: '',
        transportInventoryList: [{ productName: '', quantity: null }]
      });

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   // Log the payload to the console
  //   console.log({
  //     date: formData.date,
  //     vehicleId: formData.vehicleId,
  //     fuelType: formData.fuelType,
  //     fuelConsumption: formData.fuelConsumption,
  //     transportationType: formData.transportationType,
  //     vendor: formData.vendor,
  //     transportInventoryListist: formData.transportInventoryList
  //   });
  
  // Optionally, you can reset the form data here
  //   setFormData({
  //     date: '',
  //     vehicleId: null,
  //     fuelType: '',
  //     fuelConsumption: null,
  //     transportationType: '',
  //     vendor: '',
  //     transportInventoryList: [{ productName: '', quantity: null }]
  //   });
  // };
  

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

      <label>Vehicle ID:</label>
        <input
        type="number"
        name="vehicleId"
        value={formData.vehicleId}
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
            <option value="Vendor1">Vendor1</option>
            <option value="Vendor2">Vendor2</option>
            <option value="Vendor3">Vendor3</option>
            {/* Add other vendors as options */}
          </select>
          <br />
        </>
      )}
      <hr />
      <h3>transport Inventory List</h3>
      {formData.transportInventoryList.map((product, index) => (
        <div key={index}>
          <label>Product Name:</label>
          <select
            name="productName"
            value={product.productName}
            onChange={(e) => handleProductInputChange(index, e)}
          >
            <option value="SheepMeat">SheepMeat</option>
            <option value="BuffaloMeat">BuffaloMeat</option>
            <option value="Milk">Milk</option>
            <option value="Cheese">Cheese</option>
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
