import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Api';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear JWT token from localStorage
       logout();
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <Link to="/page1">Go to Page 1</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
};

export default Dashboard;
