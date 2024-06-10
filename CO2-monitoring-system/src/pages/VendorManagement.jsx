import React from 'react'
import MiniDrawer from '../MiniDrawer'
import VendorTable from '../tables/VendorTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'



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
        <VendorTable/>
        <br />
        <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{marginTop: '10px'}}
        >
          Add a new vendor
        </Button>
    </div>
  )
}

export default VendorManagement