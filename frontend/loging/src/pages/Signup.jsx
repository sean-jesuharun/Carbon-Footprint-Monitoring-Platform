import React, { useState } from 'react';
import { signup } from '../Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic client-side validation
        if (!username || !password || !email) {
            setMessage('All fields are required');
            return;
        }

        try {
            const response = await signup(username, password, email);
            setMessage('Signup successful! Please verify your email.');
            console.log('Signup successful:', response.data);
            navigate('/verify-email', { state: { username } }); // Redirect to email verification page

        } catch (error) {
            setMessage('Signup error: ' + (error.response?.data?.error || 'Something went wrong'));
            console.error('Signup error:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
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
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}

            <div className="text1">Already a member ? <Link to="/login" className='loginText'>Login</Link> Here</div>
        </div>
    );
};

export default Signup;
