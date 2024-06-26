import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Page1 = () => {
    return (
        <div>
            <h2>Page 1</h2>
            <div className="text1"><Link to="/dashboard" className='loginText'>Dashbord</Link></div>
        </div>
        
    );
};

export default Page1;
