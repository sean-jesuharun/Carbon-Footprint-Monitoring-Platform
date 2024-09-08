import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../Api';
import {
    Card, CardContent, TextField, Button, Typography, Snackbar, Alert
} from '@mui/material';
import BackDrop from '../BackDrop';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || {};

    const [code, setCode] = useState(''); 
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!username) {
            setMessage('Error: Username is missing');
        }
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            setMessage('Error: Username is missing');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await verifyEmail(username, code);

            // Check if response contains message indicating success
            if (response && response.data && response.data.message === 'Email verification successful') {
                setMessage('Verification successful!');
                navigate('/login', { state: { username } });
            } else {
                // Handle cases where response does not indicate success
                const errorMessage = response.data ? response.data.error : 'Unknown error';
                setMessage('Verification error: ' + errorMessage);
            }
        } catch (error) {
            // Handle network errors or exceptions
            const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
            setMessage(`Verification error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: '100%', backgroundColor: '#198773', color: '#ffffff', padding: '10px 0', textAlign: 'center',
                position: 'fixed', top: 0, left: 0, zIndex: 1000
            }}>
                <Typography variant='h4' fontWeight={700}>
                    Carbon Footprint Monitoring System
                </Typography>
            </div>
            <div style={{ marginTop: '80px', width: '100%', maxWidth: '400px', padding: '0 20px' }}>
                <Card style={{ margin: '1rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Enter Your Email Verification Code
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Verification Code"
                                fullWidth
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!code || isLoading}
                                sx={{
                                    marginTop: '1rem',
                                    padding: '10px 20px',
                                    backgroundColor: '#198773',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: '#198773'
                                    },
                                }}
                            >
                                {isLoading ? 'Verifying...' : 'Verify'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Snackbar open={!!message} autoHideDuration={6000} onClose={() => setMessage('')}>
                <Alert onClose={() => setMessage('')} severity={message.includes('successful') ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
            {isLoading && <BackDrop />}
        </div>
    );
};

export default VerifyEmail;
