import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Singup from './pages/Signup';


import MiniDrawer from './MiniDrawer';

import CarbonEmissionEvaluationForm from './forms/CarbonEmissionEvaluationFrom.jsx';
import CustomerManagementForm from './forms/CustomerManagementFrom';
import VehicleManagementForm from './forms/VehicleManagementForm';
import VendorManagementForm from './forms/VendorManagementFrom';
import VendorSupplyForm from './forms/VendorSupplyForm.jsx';

import Dashboard from './pages/Dashboard';
import VehicleManagemnet from './pages/VehicleManagement';
import VendorManagement from './pages/VendorManagement';
import CustomerManagement from './pages/CustomerManagement';
import VendorSupplyManagement from './pages/VendorSupplyManagement.jsx'






function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: '#eceff1' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/" element={<Dashboard />} />
          
          
          <Route path="/vehicle-management-form" element={<VehicleManagementForm />} />
          <Route path="/customer-management-form" element={<CustomerManagementForm />} />
          <Route path="/vendor-management-form" element={<VendorManagementForm />} />
          <Route path="/vendor-supply-form" element={<VendorSupplyForm />} />
          <Route path="/carbon-emission-evaluation-form" element={<CarbonEmissionEvaluationForm />} />

          <Route path="/mini-drawer" element={<MiniDrawer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicle-management" element={<VehicleManagemnet />} />
          <Route path="/vendor-management" element={<VendorManagement />} />
          <Route path="/customer-management" element={<CustomerManagement />} />
          <Route path="/vendor-supply-management" element={<VendorSupplyManagement />} />

          
          
          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
