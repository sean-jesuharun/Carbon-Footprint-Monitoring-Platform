import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/signup">Signup</Link>
        <br />
        <Link to="/login">Login</Link>
        {/* <br/>
        <Link to="/verify-email">Verify Email</Link> */}
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
};

export default App;
