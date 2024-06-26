import React, { useState } from 'react';
import { login } from '../Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            setMessage('Login successful!');
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            setMessage('Login error: ' + (error.response?.data?.error || error.message));
            console.error('Login error:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
            </form>
            {message && <p>{message}</p>}
            <div className="text1">New member? <Link to="/" className='loginText'>Signup</Link> Here</div>
        </div>
    );
};

export default Login;
