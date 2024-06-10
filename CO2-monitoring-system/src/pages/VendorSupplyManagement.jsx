import React from 'react'
import MiniDrawer from '../MiniDrawer'
import VendorSupplyTable from '../tables/VendorSupplyTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'



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
        <VendorSupplyTable/>
        <br />
        <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{marginTop: '10px'}}
        >
          Add a new supply
        </Button>
    </div>
  )
}

export default VendorSupplyManagement