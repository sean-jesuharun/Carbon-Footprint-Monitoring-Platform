import React from 'react'
import MiniDrawer from '../MiniDrawer'
import VehicleTable from '../tables/VehicleTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';




function VehicleManagement() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/vehicle-management-form');
  }
  return (
    <div>
        <br></br>        
        <MiniDrawer/>
        <h1>Vehicle Management</h1>
        
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
          Add a new vehicle
          </Button>
        </Box>

        <VehicleTable/>
    </div>
  )
}

export default VehicleManagement