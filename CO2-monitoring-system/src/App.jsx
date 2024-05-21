import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MLInputForm from './MLInputForm';
import VenderInputFrom from './VenderInputForm';
import MiniDrawer from './MiniDrawer';
import CarbonEmissionEvaluationFrom from './CorbonEmissionEvaluationForm';
import Dashboard from './pages/Dashboard';
import VehicleManagemnet from './pages/VehicleManagement';
import VendorManagement from './pages/VendorManagement';
import CustomerManagement from './pages/CustomerManagement';
import CarbonEmissionEvaluation from './pages/CarbonEmissionEvaluation';

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: '#eceff1' }}>
        <Routes>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
