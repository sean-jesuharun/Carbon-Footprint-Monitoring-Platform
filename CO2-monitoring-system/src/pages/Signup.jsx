import React from 'react'
import './LoginSignup.css'
import Backgound_img from '../Assests/BG.jpg'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField'; 
import { colors } from '@mui/material';

const Signup = () => {
  return (
    <div className="mainbody">
    <div className="title"> Carbon Footprint Monitoring System</div>
    <div className='container'>
        <div className='header'>
            <div className='text'><h2>Sign Up</h2></div>
            <div className='text'>Welcome onboard with us!</div>
        </div>
      <div className='inputs'>
        <div className="input1">
        <div className='Full name'>Full name</div>
          <TextField id="outlined-basic" label="Enter Your Full Name" variant="outlined" size="small"/>
        </div>
        <div className="input1">
        <div className='Email'>Email</div>
          <TextField id="outlined-basic" label="Enter Your Email" variant="outlined" size="small"/>
        </div>
        <div className="input1">
        <div className='Password'>Password</div>
        <TextField id="outlined-basic" label="Enter Your Password" variant="outlined" size="small"/>
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">
        <Button variant="contained">Sign Up</Button>
        </div>
      </div>
      <div className="text1">Already a member ? <Link to="/" className='loginText'>Login</Link> Here</div>
    </div>
    </div>
  )
}

export default Signup
