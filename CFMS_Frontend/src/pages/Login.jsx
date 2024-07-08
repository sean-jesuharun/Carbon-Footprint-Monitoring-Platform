import React, { useState } from 'react';
import { login } from '../Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Card, CardContent, TextField, Button, Typography, Snackbar, Alert
} from '@mui/material';
import BackDrop from '../BackDrop';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await login(username, password);
            setMessage('Login successful!');
            setSnackbarOpen(true);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            setMessage('Login error: ' + (error.response?.data?.error || error.message));
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
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
                <Typography variant='subtitle1' sx={{ textAlign: 'center', margin: '10px 0' }}>
                    Welcome back! Please log in to continue.
                </Typography>
                <Card style={{ margin: '1rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1" gutterBottom>Username:</Typography>
                        <TextField
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Username"
                            fullWidth
                            required
                        />
                        <Typography variant="subtitle1" gutterBottom>Password:</Typography>
                        <TextField
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            fullWidth
                            required
                        />
                    </CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!username || !password || isLoading}
                            sx={{
                                padding: '10px 20px',
                                color: '#ffffff',
                                backgroundColor: !username || !password ? '#ccc' : '#198773',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    color: !username || !password ? '#ccc' : '#198773'
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </Button>
                    </div>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', marginTop: '10px' }}>
                        New member? <Link to="/signup" style={{ color: '#198773', textDecoration: 'none' }}>Sign up </Link>Here
                        <br></br>
                        <Link to="/resetpassword" style={{ color: '#198773', textDecoration: 'none' }}> Lost Password </Link> ?
                    </Typography>
                </Card>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={message.includes('successful') ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
            {isLoading && <BackDrop />}
        </div>
    );
};

export default Login;

