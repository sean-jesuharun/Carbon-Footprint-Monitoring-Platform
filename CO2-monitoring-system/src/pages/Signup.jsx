import React, { useState } from 'react';
import { signup } from '../Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Card, CardContent, TextField, Button, Typography, Snackbar, Alert
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import BackDrop from '../BackDrop';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [passwordStarted, setPasswordStarted] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setUsernameValid(value.length >= 3 && value.length <= 20);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordStarted(true);

        const containsNumber = /[0-9]/.test(value);
        const containsSpecialChar = /[!@#$%^&*+]/.test(value); // Updated to include '+'
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        setPasswordValid(value.length >= 8 && containsNumber && containsSpecialChar && containsUppercase && containsLowercase);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!usernameValid || !passwordValid || !emailValid) {
            setMessage('Please fill out all fields correctly.');
            setSnackbarOpen(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await signup(username, password, email);
            setMessage('Signup successful! Please verify your email.');
            navigate('/verify-email', { state: { username } });
        } catch (error) {
            setMessage('Signup error: ' + (error.response?.data?.error || 'Something went wrong'));
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
                    Welcome! Please sign up to continue.
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
                            InputProps={{
                                endAdornment: usernameValid ? <CheckCircle style={{ color: '#4CAF50' }} /> : <Cancel style={{ color: '#f44336' }} />,
                            }}
                            helperText={usernameValid ? "Username meets requirements." : "Username must be between 3 and 20 characters."}
                        />
                        <Typography variant="subtitle1" gutterBottom>Password:</Typography>
                        <TextField
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: passwordValid ? <CheckCircle style={{ color: '#4CAF50' }} /> : <Cancel style={{ color: '#f44336' }} />,
                            }}
                            helperText={passwordValid ? "Password meets requirements." : (
                                passwordStarted ? (
                                    <>
                                        <div style={{ color: password.length >= 8 ? '#4CAF50' : '#f44336' }}>Must be at least 8 characters.</div>
                                        <div style={{ color: /[0-9]/.test(password) ? '#4CAF50' : '#f44336' }}>
                                            {/[0-9]/.test(password) ? 'Contains at least 1 number' : 'Must contain at least one number.'}
                                        </div>
                                        <div style={{ color: /[!@#$%^&*+]/.test(password) ? '#4CAF50' : '#f44336' }}>
                                            {/[!@#$%^&*+]/.test(password) ? 'Contains at least 1 special character' : 'Must contain at least one special character.'}
                                        </div>
                                        <div style={{ color: /[A-Z]/.test(password) ? '#4CAF50' : '#f44336' }}>
                                            {/[A-Z]/.test(password) ? 'Contains at least 1 uppercase letter' : 'Must contain at least one uppercase letter.'}
                                        </div>
                                        <div style={{ color: /[a-z]/.test(password) ? '#4CAF50' : '#f44336' }}>
                                            {/[a-z]/.test(password) ? 'Contains at least 1 lowercase letter' : 'Must contain at least one lowercase letter.'}
                                        </div>
                                    </>
                                ) : "Password must be at least 8 characters long."
                            )}
                        />
                        <Typography variant="subtitle1" gutterBottom>Email:</Typography>
                        <TextField
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: emailValid ? <CheckCircle style={{ color: '#4CAF50' }} /> : <Cancel style={{ color: '#f44336' }} />,
                            }}
                            helperText={emailValid ? "Email looks good!" : "Please enter a valid email address."}
                        />
                    </CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!usernameValid || !passwordValid || !emailValid || isLoading}
                            sx={{
                                padding: '10px 20px',
                                color: '#ffffff',
                                backgroundColor: '#198773',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    color: '#198773'
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </div>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', marginTop: '10px' }}>
                        Already have an account? <Link to="/login" style={{ color: '#198773', textDecoration: 'none' }}>Log in</Link> Here
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

export default Signup;
