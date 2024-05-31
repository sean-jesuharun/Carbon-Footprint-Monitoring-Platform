import React from 'react'
import MiniDrawer from '../MiniDrawer'
import VehicleTable from '../tables/VehicleTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'




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
        <VehicleTable/>
        <br />
        <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{marginTop: '10px'}}
        >
          Add a new vehicle
        </Button>
    </div>
  )
}

export default VehicleManagement