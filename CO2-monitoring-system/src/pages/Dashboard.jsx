import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import DashboardTable from '../tables/DashBoardTable'
import { Button ,Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Navbar from '../Navbar'
import AddIcon from '@mui/icons-material/Add';


function Dashboard() {
  const Navigate = useNavigate();
  const label1="NEW CARBON EMISSION";
  return (
    <div style={{ 
      backgroundColor:'#ffffff',
       minHeight: '100vh' }}>
        <Navbar/>
        
        <Box sx={{ display: 'flex', justifyContent: 'center',marginLeft:'4rem',
            marginTop: { xs: 10, sm: 10 },  }}>
          <Typography variant='h3'  color='#5D6259' fontWeight={1000} >Carbon Footprint Evaluation Jobs</Typography>
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
        onClick={()=>Navigate("/carbon-emission-evaluation-form")}
        startIcon={<AddIcon />}

        >
             new calculation
        </Button>
        </Box>

        <DashboardTable/>
    </div>
  )
}

export default Dashboard