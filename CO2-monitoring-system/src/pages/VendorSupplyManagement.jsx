import React from 'react'
import VendorSupplyTable from '../tables/VendorSupplyTable'
import { Button,Typography } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Navbar from '../Navbar'
import AddIcon from '@mui/icons-material/Add';



function VendorSupplyManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/vendor-supply-form');
  }
  return (
    <div style={{ 
      backgroundColor:'#ffffff',
       minHeight: '100vh' }}>        
        <Navbar/>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginLeft:'4rem',
            marginTop: { xs: 10, sm: 10 },  }}>
          <Typography variant='h3'  color='#5D6259' fontWeight={1000} >Vendor Supply Management</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" padding="1.6rem">
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
          new supply
          </Button>
        </Box>

        <VendorSupplyTable/>

    </div>
  )
}

export default VendorSupplyManagement