import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import Page1 from './pages/Page1';
import CustomerManagement from './pages/CustomerManagement';


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <div>
            <Routes>
                 <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/page1" element={<PrivateRoute><Page1 /></PrivateRoute>} />
                <Route path="/customermanagement" element={<PrivateRoute><CustomerManagement/></PrivateRoute>} />
            </Routes>
        </div>
    );
};

export default App;
