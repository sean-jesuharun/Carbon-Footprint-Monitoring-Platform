import React from 'react'
import MiniDrawer from '../MiniDrawer'
import VendorTable from '../tables/VendorTable'
import { Button,Typography } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Navbar from '../Navbar'
import { styled, useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';



function VendorManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/vendor-management-form');
  }

  

  return (
      <div style={{ backgroundColor:'#ffffff',minHeight: '100vh' }}>        
        <Navbar/>

        <Box p={2} sx={{margin:'0 9rem'}}>
        <Box sx={{
            textAlign:'center',
            mb:2,
            marginLeft:'4rem',
            marginTop: { xs: 10, sm: 10 }, 
            
          }}>
          {/* <Typography variant='h2' color='#1b263b'>Vendor Management</Typography> */}
          <Typography variant='h3' color='#5D6259' fontWeight={1000} >Vendor Management</Typography>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
        variant='contained'
        sx={{ 
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
           new vendor
          </Button>
        </Box>
        </Box>

       <VendorTable />
      
    </div>
  )
}

export default VendorManagement