import React from 'react'
import './LoginSignup.css'
//import { Link } from 'react-router-dom';
import { Button,TextField } from '@mui/material';


export default function Login() {
    return (
        <div className="mainbody">
        <div className="title"> Carbon Footprint Monitoring System</div>
        <div className='container'>
        <div className='header'>
                <div className='text0'><h2>Login</h2></div>
           
                <div className='text'>Welcome onboard with us!</div>
            </div>

            <div className='inputs'>
            
            <div className="input">
            <div className='Email'>Email</div>
                <TextField id="outlined-basic" label="Enter Your Email" variant="outlined" size="small"/>
            </div>

            <div className="input"><br />
            <div className='Password'>Password</div>
            <TextField id="outlined-basic" label="Enter Your Password" variant="outlined" size="small"/>
            </div>
          </div><br />

          {/* <div className="text2"><Link to="#" className='loginText'>Forgot Password?</Link> </div> */}
          <div className="submit-container">
            <div className="submit">
            <Button variant="contained">Login</Button>
            </div>
          </div>
          {/* <div className="text1">Don't have an Account ? <Link to="/signup" className='loginText'>Register</Link> Here</div> */}

        </div>
    </div>
      )
}
