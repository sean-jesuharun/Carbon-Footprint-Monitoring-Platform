import React from 'react'
import { Link, useNavigate} from 'react-router-dom'


import MiniDrawer from '../MiniDrawer'
import DashboardTable from '../tables/DashBoardTable'
import { Button } from '@mui/material'

function Dashboard() {
  const Navigate = useNavigate();
  return (
    <div>
        <br></br>
        
        <MiniDrawer/>
        <h1>Dash Board</h1>
        <DashboardTable/>
        <Button onClick={()=>Navigate("/carbon-emission-evaluation")}>
            Do a new calculation
        </Button>
    </div>
  )
}

export default Dashboard