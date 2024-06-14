import React from 'react'
import MiniDrawer from '../MiniDrawer'
import CustomerTable from '../tables/CustomerTable'
import { Button,Typography } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';



function CustomerManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/customer-management-form');
  }
  return (
    <div>        
        <MiniDrawer/>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h2' marginTop={10} marginBottom={-3} color='#78909c'>Customer Management</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" padding="16px">
        <Button
        variant='contained'
        sx={{ 
          padding: '10px 20px', 
          color: '#fff', 
          backgroundColor: '#1b263b',
          '&:hover': {
            backgroundColor: '#778da9',
          },}}
        onClick={handleButtonClick}
        style={{marginTop: '10px'}}>
          Add a new customer
          </Button>
        </Box>
        <CustomerTable/>

    </div>
  )
}

export default CustomerManagement