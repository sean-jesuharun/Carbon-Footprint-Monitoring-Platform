import React from 'react'
import { Link, useNavigate} from 'react-router-dom'


import MiniDrawer from '../MiniDrawer'
import { Button } from '@mui/material'

function Dashboard() {
  const Navigate = useNavigate();
  return (
    <div>
        <br></br>
        <h1>Dashboard</h1>
        <MiniDrawer/>
        <Button onClick={()=>Navigate("/carbon-emission-evaluation")}>
            Do a new calculation
        </Button>
    </div>
  )
}

export default Dashboard