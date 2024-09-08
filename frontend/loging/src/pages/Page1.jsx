import React from 'react';
//import CustomerTable from '../tables/CustomerTable'
//import { Button,Typography } from '@mui/material'
import { useNavigate} from 'react-router-dom'
//import Box from '@mui/material/Box';
//import Navbar from '../Navbar'
//import AddIcon from '@mui/icons-material/Add';

const CustomerManagement = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/customer-management-form');
  }
  return (
    <div style={{ 
      backgroundColor:'#ffffff',
       minHeight: '100vh' }}>
     
        
        <Navbar/>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginLeft:'4rem',
            marginTop: { xs: 10, sm: 10 },  }}>
          <Typography variant='h3'  color='#5D6259' fontWeight={1000} >Customer Management</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" padding="1.6rem" sx={{color:'black'}}>
        <Button
        variant='contained'
        sx={{ 
          padding: '0.5rem 1rem', 
          color: '#ffffff', 
          backgroundColor: '#198773',
          '&:hover': {
            backgroundColor: '#ffffff',
            color:'#198773'
          },
          borderRadius:'1rem'
        }}
        onClick={handleButtonClick}
        startIcon={<AddIcon />}
        >
            new customer
          </Button>
        </Box>
        <CustomerTable/>

    </div>
  )
}

export default CustomerManagement