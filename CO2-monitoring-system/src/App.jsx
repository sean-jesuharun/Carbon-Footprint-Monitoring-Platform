import React from 'react';
import MLInputForm from './MLInputForm'; // Assuming MLInputForm is in the same directory
import { green } from '@mui/material/colors';
import {teal} from '@mui/material/colors';
import { Typography } from '@mui/material';
const color = green[50];





function App() {
  return (
    
    <div className="App" style={{ backgroundColor: color }} >
      <Typography variant='h2'marginTop={5} marginBottom={3} color='#78909c' >Transportation data input form</Typography>
      <MLInputForm />
    </div>
  );
}

export default App;
