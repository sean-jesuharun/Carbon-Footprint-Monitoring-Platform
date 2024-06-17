import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyEmail } from '../Api'; // Import your verifyEmail API function
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const location = useLocation();
    const { username } = location.state || { username: '' }; // Destructure state and provide default value
    const [code, setCode] = useState(''); // State for verification code
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state
        setMessage(''); // Clear previous messages
    
        try {
            const response = await verifyEmail(username, code); // Call verifyEmail API function with username and code
    
            // Check if response contains message indicating success
            if (response && response.data && response.data.message === 'Email verification successful') {
                setMessage('Verification successful!');
                console.log('Verification successful');
                navigate('/login', { state: { username } });
            } else {
                // Handle cases where response does not indicate success
                const errorMessage = response.data ? response.data.error : 'Unknown error';
                setMessage('Verification error: ' + errorMessage);
                console.error('Verification error:', errorMessage);
            }
        } catch (error) {
            // Handle network errors or exceptions
            const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
            setMessage(`Verification error: ${errorMessage}`);
            console.error('Verification error:', errorMessage);
        } finally {
            setIsLoading(false); // Clear loading state
        }
    };
    

    const handlePrintUsername = () => {
        console.log('Username:', username);
    };

    return (
        <div>
            <h2>Enter Your Email Verification Code</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="verification-code">Verification Code:</label>
                <input
                    id="verification-code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Verification Code"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyEmail;
