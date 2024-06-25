import React from 'react'
import CustomerTable from '../tables/CustomerTable'
import { Button,Typography } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Navbar from '../Navbar'



function CustomerManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/customer-management-form');
  }
  return (
    <div style={{ backgroundImage: 'linear-gradient(135deg, #1b263b,#caf0f8)', minHeight: '100vh' }}>        
        
        <Navbar/>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginLeft:'4rem',
            marginTop: { xs: 10, sm: 10 },  }}>
          <Typography variant='h2'  color='#caf0f8' fontWeight={1000} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Customer Management</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" padding="1.6rem">
        <Button
        variant='contained'
        sx={{ 
          padding: '1rem 2rem', 
          color: '#fff', 
          backgroundColor: '#1b263b',
          '&:hover': {
            backgroundColor: '#778da9',
          },}}
        onClick={handleButtonClick}
        style={{marginTop: '1rem'}}>
          Add a new customer
          </Button>
        </Box>
        <CustomerTable/>

    </div>
  )
}

export default CustomerManagement