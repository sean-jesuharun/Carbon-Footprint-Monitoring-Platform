import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import DashboardTable from '../tables/DashBoardTable'
import { Button ,Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Navbar from '../Navbar'

function Dashboard() {
  const Navigate = useNavigate();
  const label1="NEW CARBON EMISSION";
  return (
    <div style={{ backgroundImage: 'linear-gradient(135deg, #1b263b,#caf0f8)', minHeight: '100vh' }}>
        <Navbar/>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginLeft:'4rem',
            marginTop: { xs: 10, sm: 10 },  }}>
          <Typography variant='h2'  color='#caf0f8' fontWeight={1000} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Carbon Footprint Evaluation Jobs</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" padding="1.6rem">
        <Button
        variant='contained'
        sx={{ 
          padding: '1rem 2rem', 
          color: '#fff', 
          backgroundColor: '#1b263b',
          '&:hover': {
            backgroundColor: '#778da9',
          },}}
        onClick={()=>Navigate("/carbon-emission-evaluation-form")}
        style={{marginTop: '1rem'}}>
            Do a new calculation
        </Button>
        </Box>

        <DashboardTable/>
    </div>
  )
}

export default Dashboard