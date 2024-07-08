import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initiatePasswordReset, confirmResetPassword } from '../Api';
import {
    Card, CardContent, TextField, Button, Typography, Snackbar, Alert
} from '@mui/material';
import BackDrop from '../BackDrop';
import { CheckCircle, Cancel } from '@mui/icons-material';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordStarted, setPasswordStarted] = useState(false);
    const [stage, setStage] = useState('request'); // 'request' or 'confirm'
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordStarted(true);

        const containsNumber = /[0-9]/.test(value);
        const containsSpecialChar = /[!@#$%^&*+]/.test(value);
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        setPasswordValid(value.length >= 8 && containsNumber && containsSpecialChar && containsUppercase && containsLowercase);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleInitiateReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await initiatePasswordReset(username);
            setMessage(response.data.message);
            setStage('confirm');
        } catch (error) {
            setMessage(error.response.data.error);
        } finally {
            setIsLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleConfirmReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await confirmResetPassword(username, code, password);
            setMessage(response.data.message);
            navigate('/login'); // Redirect to login page after successful password reset
        } catch (error) {
            setMessage(error.response.data.error);
        } finally {
            setIsLoading(false);
            setSnackbarOpen(true);
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
                {stage === 'request' && (
                    <Card style={{ margin: '1rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Reset Password
                            </Typography>
                            <form onSubmit={handleInitiateReset}>
                                <TextField
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    label="Username"
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!username || isLoading}
                                    sx={{
                                        marginTop: '1rem',
                                        padding: '10px 20px',
                                        backgroundColor: !username ? '#ccc' : '#198773',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#ffffff',
                                            color: !username ? '#ccc' : '#198773'
                                        },
                                    }}
                                >
                                    {isLoading ? 'Processing...' : 'Reset Password'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {stage === 'confirm' && (
                    <Card style={{ margin: '1rem auto', borderRadius: '0.5rem', padding: '1rem', border: '10px solid #D5E9E5' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Confirm Password Reset
                            </Typography>
                            <form onSubmit={handleConfirmReset}>
                                <TextField
                                    type="text"
                                    value={code}
                                    onChange={handleCodeChange}
                                    label="Verification Code"
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    label="New Password"
                                    fullWidth
                                    required
                                    margin="normal"
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!code || !passwordValid || isLoading}
                                    sx={{
                                        marginTop: '1rem',
                                        padding: '10px 20px',
                                        backgroundColor: !code || !passwordValid ? '#ccc' : '#198773',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#ffffff',
                                            color: !code || !passwordValid ? '#ccc' : '#198773'
                                        },
                                    }}
                                >
                                    {isLoading ? 'Processing...' : 'Confirm Password Reset'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {message && (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '1rem', color: message.includes('successful') ? '#198773' : '#f44336' }}>
                        {message}
                    </Typography>
                )}
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

export default ResetPassword;
