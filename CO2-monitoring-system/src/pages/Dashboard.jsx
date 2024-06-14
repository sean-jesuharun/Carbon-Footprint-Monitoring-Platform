import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import MiniDrawer from '../MiniDrawer'
import DashboardTable from '../tables/DashBoardTable'
import { Button ,Typography } from '@mui/material'
import Box from '@mui/material/Box';

function Dashboard() {
  const Navigate = useNavigate();
  const label1="NEW CARBON EMISSION";
  return (
    <div>
        <MiniDrawer/>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h2' marginTop={10} marginBottom={-3} color='#78909c'>Carbon Footprint Evaluation Jobs</Typography>
        </Box>
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