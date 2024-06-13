import React from 'react'
import MiniDrawer from '../MiniDrawer'
import VendorSupplyTable from '../tables/VendorSupplyTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';



function VendorSupplyManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/vendor-supply-form');
  }
  return (
    <div>
        <br></br>        
        <MiniDrawer/>
        <h1>Vendor Supply Management</h1>
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
          Add a new supply
          </Button>
        </Box>

        <VendorSupplyTable/>

    </div>
  )
}

export default VendorSupplyManagement