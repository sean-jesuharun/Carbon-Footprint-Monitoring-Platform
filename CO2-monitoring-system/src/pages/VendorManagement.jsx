import React from 'react'
import MiniDrawer from '../MiniDrawer'
import VendorTable from '../tables/VendorTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';



function VendorManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/vendor-management-form');
  }
  return (
    <div>
        <br></br>        
        <MiniDrawer/>
        <h1>Vendor Management</h1>
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
          Add a new vendor
          </Button>
        </Box>

        <VendorTable/>

    </div>
  )
}

export default VendorManagement