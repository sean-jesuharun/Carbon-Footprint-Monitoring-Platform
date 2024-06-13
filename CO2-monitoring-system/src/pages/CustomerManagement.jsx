import React from 'react'
import MiniDrawer from '../MiniDrawer'
import CustomerTable from '../tables/CustomerTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';



function CustomerManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/customer-management-form');
  }
  return (
    <div>
        <br></br>        
        <MiniDrawer/>
        <h1>Customer Management</h1>
        <br />
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