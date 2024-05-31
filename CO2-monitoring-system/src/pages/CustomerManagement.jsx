import React from 'react'
import MiniDrawer from '../MiniDrawer'
import CustomerTable from '../tables/CustomerTable'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom'




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
        <CustomerTable/>
        <br />
        <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{marginTop: '10px'}}
        >
          Add a new customer
        </Button>
    </div>
  )
}

export default CustomerManagement