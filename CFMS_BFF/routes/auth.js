const express = require('express');
const router = express.Router();
const { cognito, clientId } = require('../config/aws');

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const params = {
        ClientId: clientId,
        Username: username,
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
        ],
    };
    try {
        const data = await cognito.signUp(params).promise();
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };

    try {
        const data = await cognito.initiateAuth(params).promise();

        // Extract tokens from AuthenticationResult
        const { AccessToken, RefreshToken, IdToken } = data.AuthenticationResult;

        // Return tokens to frontend
        res.json({ AccessToken, RefreshToken, IdToken });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(400).json({ error: err.message });
    }
});

// Verify Email Route
router.post('/verify-email', async (req, res) => {
    const { username, code } = req.body;
    const params = {
        ClientId: clientId,
        Username: username,
        ConfirmationCode: code,
    };
    try {
        await cognito.confirmSignUp(params).promise();
        res.json({ message: 'Email verification successful' });
    } catch (err) {
        console.error('Error confirming verification code:', err);
        res.status(400).json({ error: 'Error confirming verification code', message: err.message });
    }
});

// Initiate Password Reset Route
router.post('/reset-password', async (req, res) => {
    const { username } = req.body;
    const params = {
        ClientId: clientId,
        Username: username,
    };
    try {
        const data = await cognito.forgotPassword(params).promise();
        res.json({ message: 'Password reset initiated. Check your email for verification code.' });
    } catch (err) {
        console.error('Error initiating password reset:', err);
        res.status(400).json({ error: 'Error initiating password reset', message: err.message });
    }
});

// Confirm Password Reset Route
router.post('/confirm-reset-password', async (req, res) => {
    const { username, code, newPassword } = req.body;
    const params = {
        ClientId: clientId,
        Username: username,
        ConfirmationCode: code,
        Password: newPassword,
    };
    try {
        const data = await cognito.confirmForgotPassword(params).promise();
        res.json({ message: 'Password reset successfully completed. You can now login with your new password.' });
    } catch (err) {
        console.error('Error confirming password reset:', err);
        res.status(400).json({ error: 'Error confirming password reset', message: err.message });
    }
});

module.exports = router;
