import React from 'react'
import VehicleTable from '../tables/VehicleTable'
import { Button ,Typography} from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Navbar from '../Navbar'
import AddIcon from '@mui/icons-material/Add';


function VehicleManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/vehicle-management-form');
  }
  return (
    <div style={{  minHeight: '100vh' , backgroundColor:'#ffffff'}}>       
        
        <Navbar/>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginLeft:'4rem',marginTop:{xs: 10, sm: 10 } }}>
          <Typography variant='h3' color='#5D6259' fontWeight={1000} >Vehicle Management</Typography>
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
        style={{marginTop: '1rem'}}
        startIcon={<AddIcon />} >
        
          new vehicle
          </Button>
        </Box>

        <VehicleTable/>
    </div>
  )
}

export default VehicleManagement