// import React, { useState } from 'react';
// import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
// import MiniDrawer from './MiniDrawer';

// const CustomerManagementForm = () => {
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerLocation: '',
//     distanceFromWarehouse: ''
//   });

//   const [errors, setErrors] = useState({
//     customerName: '',
//     customerLocation: '',
//     distanceFromWarehouse: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validateForm = () => {
//     const nameRegex = /^[a-zA-Z\s]*$/;
//     const locationRegex = /^[a-zA-Z\s]*$/;
//     const distanceRegex = /^[0-9]*\.?[0-9]+$/;

//     let valid = true;
//     let newErrors = { customerName: '', customerLocation: '', distanceFromWarehouse: '' };

//     if (!nameRegex.test(formData.customerName)) {
//       newErrors.customerName = 'Customer Name should only contain letters and spaces.';
//       valid = false;
//     }

//     if (!locationRegex.test(formData.customerLocation)) {
//       newErrors.customerLocation = 'Customer Location should only contain letters and spaces.';
//       valid = false;
//     }

//     if (!distanceRegex.test(formData.distanceFromWarehouse) || parseFloat(formData.distanceFromWarehouse) <= 0) {
//       newErrors.distanceFromWarehouse = 'Distance should be a positive number.';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log(formData); // Log form data to console
//       // Reset the form
//       setFormData({
//         customerName: '',
//         customerLocation: '',
//         distanceFromWarehouse: ''
//       });
//       setErrors({
//         customerName: '',
//         customerLocation: '',
//         distanceFromWarehouse: ''
//       });
//     }
//   };

//   return (
//     <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
//       <MiniDrawer />
//       <form onSubmit={handleSubmit}>
//         <br />
//         <br />
//         <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Customer Management Form</Typography>
//         <Card style={{ width: '70%', margin: '0 auto' }}>
//           <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
//             <Typography variant="subtitle1" gutterBottom>Customer Name:</Typography>
//             <TextField
//               type="text"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleInputChange}
//               fullWidth
//               required
//               error={!!errors.customerName}
//               helperText={errors.customerName}
//             />
//             <Typography variant="subtitle1" gutterBottom>Customer Location:</Typography>
//             <TextField
//               type="text"
//               name="customerLocation"
//               value={formData.customerLocation}
//               onChange={handleInputChange}
//               fullWidth
//               required
//               error={!!errors.customerLocation}
//               helperText={errors.customerLocation}
//             />
//             <Typography variant="subtitle1" gutterBottom>Distance from Sysco warehouse (km):</Typography>
//             <TextField
//               type="number"
//               name="distanceFromWarehouse"
//               value={formData.distanceFromWarehouse}
//               onChange={handleInputChange}
//               fullWidth
//               required
//               error={!!errors.distanceFromWarehouse}
//               helperText={errors.distanceFromWarehouse}
//             />
//           </CardContent>
//         </Card>
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
//           <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CustomerManagementForm;





//THIS CODE IS TAKEN FORM CustomerManagement.jsx

import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';

const CustomerManagementForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    distanceFromWarehouse: ''
  });

  const [errors, setErrors] = useState({
    customerName: '',
    location: '',
    distanceFromWarehouse: ''
  });

  const validateField = (name, value) => {
    let error = '';
    const lettersAndSpaces = /^[A-Za-z\s]*$/;

    if ((name === 'customerName' || name === 'location') && !lettersAndSpaces.test(value)) {
      error = 'This field should only contain letters and spaces';
    }
    if (name === 'distanceFromWarehouse') {
      const distance = parseFloat(value);
      if (isNaN(distance) || distance <= 0) {
        error = 'Distance should be a positive number greater than 0';
      }
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: error
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   let formIsValid = true;
  //   const newErrors = {
  //     customerName: validateField('customerName', formData.customerName),
  //     location: validateField('location', formData.location),
  //     distanceFromWarehouse: validateField('distanceFromWarehouse', formData.distanceFromWarehouse)
  //   };

  //   if (newErrors.customerName || newErrors.location || newErrors.distanceFromWarehouse) {
  //     formIsValid = false;
  //   }

  //   setErrors(newErrors);

  //   if (formIsValid) {
  //     console.log(formData); // Log form data to console
  //     // Reset the form
  //     setFormData({
  //       customerName: '',
  //       location: '',
  //       distanceFromWarehouse: ''
  //     });
  //     setErrors({
  //       customerName: '',
  //       location: '',
  //       distanceFromWarehouse: ''
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to console
    console.log(formData);

    // Send a POST request to the backend API
    const url = 'http://localhost:8060/customers'; 
    const requestData = { ...formData };

    try {
      const response = await axios.post(url, requestData);
      console.log('Data submitted successfully:', response.data);
     // Reset the form
      setFormData({
        customerName: '',
        location: '',
        distanceFromWarehouse: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
      <MiniDrawer />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <Typography variant='h2' marginTop={1} marginBottom={3} color='#78909c'>Customer Management Form</Typography>
        <Card style={{ width: '70%', margin: '0 auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Customer Name:</Typography>
            <TextField
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
            <Typography variant="subtitle1" gutterBottom>Customer Location:</Typography>
            <TextField
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.location}
              helperText={errors.location}
            />
            <Typography variant="subtitle1" gutterBottom>Distance From Warehouse (km):</Typography>
            <TextField
              type="number"
              name="distanceFromWarehouse"
              value={formData.distanceFromWarehouse}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.distanceFromWarehouse}
              helperText={errors.distanceFromWarehouse}
              inputProps={{ step: "0.01", min: "0.01" }} // Ensure input accepts decimal values
            />
          </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button type="submit" variant='contained' color='primary' style={{ width: '200px' }}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerManagementForm;
