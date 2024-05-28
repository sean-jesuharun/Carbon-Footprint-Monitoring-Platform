import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Singup from './pages/Signup';
import MLInputForm from './MLInputForm';
import VenderInputFrom from './VenderInputForm';
import MiniDrawer from './MiniDrawer';
import CarbonEmissionEvaluationFrom from './CorbonEmissionEvaluationForm';
import Dashboard from './pages/Dashboard';
import VehicleManagemnet from './pages/VehicleManagement';
import VendorManagement from './pages/VendorManagement';
import CustomerManagement from './pages/CustomerManagement';
import CarbonEmissionEvaluation from './pages/CarbonEmissionEvaluation';
import VendorSupply from './pages/VendorSupply';


function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: '#eceff1' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/ml-input-form" element={<MLInputForm />} />
          <Route path="/vender-input-form" element={<VenderInputFrom />} />
          <Route path="/mini-drawer" element={<MiniDrawer />} />
          <Route
            path="/carbon-emission-evaluation-form"
            element={<CarbonEmissionEvaluationFrom />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicle-management" element={<VehicleManagemnet />} />
          <Route path="/vendor-management" element={<VendorManagement />} />
          <Route path="/customer-management" element={<CustomerManagement />} />
          <Route
            path="/carbon-emission-evaluation"
            element={<CarbonEmissionEvaluation />}
          />
          <Route path="/vendor-supply" element={<VendorSupply />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
