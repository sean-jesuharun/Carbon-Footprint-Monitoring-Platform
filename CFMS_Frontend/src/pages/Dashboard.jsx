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
        
        <Box p={2} sx={{margin:'0 9rem'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center',marginLeft:'4rem',
              marginTop: { xs: 10, sm: 10 }, mb:2 }}>
            <Typography variant='h3'  color='#5D6259' fontWeight={1000} sx={{marginBottom:'0.5rem'}}>Carbon Footprint Evaluation Jobs</Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end"  sx={{mb:2}}>
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
              new delivery
          </Button>
          </Box>
        </Box>

        <DashboardTable/>
    </div>
  )
}

export default Dashboard