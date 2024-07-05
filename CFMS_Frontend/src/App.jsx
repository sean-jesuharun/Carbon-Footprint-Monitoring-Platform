import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// import Login from './pages/old Login.jsx';
// import Singup from './pages/old Signup.jsx';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';

import MiniDrawer from './MiniDrawer';

import CarbonEmissionEvaluationForm from './forms/CarbonEmissionEvaluationForm.jsx';
import CustomerManagementForm from './forms/CustomerManagementForm.jsx';
import VehicleManagementForm from './forms/VehicleManagementForm';
import VendorManagementForm from './forms/VendorManagementForm.jsx';
import VendorSupplyForm from './forms/VendorSupplyForm.jsx';

import Dashboard from './pages/Dashboard';
import VehicleManagemnet from './pages/VehicleManagement';
import VendorManagement from './pages/VendorManagement';
import CustomerManagement from './pages/CustomerManagement';
import VendorSupplyManagement from './pages/VendorSupplyManagement.jsx'


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
};



function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: '#eceff1' }}>
        <Routes>
        <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail/>} />

          {/* <Route path="/" element={<Dashboard />} /> */}
          
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/vehicle-management-form" element={<PrivateRoute><VehicleManagementForm /></PrivateRoute>} />
          <Route path="/customer-management-form" element={<PrivateRoute><CustomerManagementForm /></PrivateRoute>} />
          <Route path="/vendor-management-form" element={<PrivateRoute><VendorManagementForm /></PrivateRoute>} />
          <Route path="/vendor-supply-form" element={<PrivateRoute><VendorSupplyForm /></PrivateRoute>} />
          <Route path="/carbon-emission-evaluation-form" element={<PrivateRoute><CarbonEmissionEvaluationForm /></PrivateRoute>} />

          <Route path="/mini-drawer" element={<PrivateRoute><MiniDrawer /></PrivateRoute>} />
          
          <Route path="/vehicle-management" element={<PrivateRoute><VehicleManagemnet /></PrivateRoute>} />
          <Route path="/vendor-management" element={<PrivateRoute><VendorManagement /></PrivateRoute>} />
          <Route path="/customer-management" element={<PrivateRoute><CustomerManagement /></PrivateRoute>} />
          <Route path="/vendor-supply-management" element={<PrivateRoute><VendorSupplyManagement /></PrivateRoute>} />

          
          
          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
