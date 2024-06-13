import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import MiniDrawer from '../MiniDrawer'
import DashboardTable from '../tables/DashBoardTable'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';

function Dashboard() {
  const Navigate = useNavigate();
  const label1="NEW CARBON EMISSION";
  return (
    <div>
        <br></br>
        
        <MiniDrawer/>
        <h1>Carbon Footprint Evaluation Jobs</h1>
        
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
        onClick={()=>Navigate("/carbon-emission-evaluation-form")}
        style={{marginTop: '10px'}}>
            Do a new calculation
        </Button>
        </Box>

        <DashboardTable/>
    </div>
  )
}

export default Dashboard