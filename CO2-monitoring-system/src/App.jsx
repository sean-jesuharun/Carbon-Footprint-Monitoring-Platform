import React from 'react';

import MLInputForm from './MLInputForm'; // Assuming MLInputForm is in the same directory
import VenderInputFrom from './VenderInputForm';
import CarbonEmissionEvaluationFrom from './CorbonEmissionEvaluationForm'
import MiniDrawer from './MiniDrawer';
import { green } from '@mui/material/colors';
import {teal} from '@mui/material/colors';
import { Typography } from '@mui/material';


function App() {
  return (
    <div className="App" style={{ backgroundColor: '#eceff1' }} >     
      <MLInputForm />
      <VenderInputFrom/>
      {/* <MiniDrawer/> */}
      {/* <CarbonEmissionEvaluationFrom/> */}
      
    </div>
  );
}

export default App;
