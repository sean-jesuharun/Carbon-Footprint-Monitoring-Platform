const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');
const jwtUtils = require('./jwtUtils'); // Adjust the path as per your file structure

const app = express();
app.use(bodyParser.json());
app.use(cors());

// AWS Cognito configuration
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-north-1' });

const clientId = '3ls5ll0thrsndh6a7turjdqgch';

// Signup Route
app.post('/signup', async (req, res) => {
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

// Login Route with JWT Token Generation
app.post('/login', async (req, res) => {
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

        // Generate JWT token upon successful login
        const token = jwtUtils.generateToken(username);

        // Return the token along with other necessary data
        res.json({ token, ...data.AuthenticationResult });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Protected Route Example dashbord- Verify JWT Token
app.get('/dashboard', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    try {
        // Verify the JWT token
        const decoded = jwtUtils.verifyToken(token);
        // Proceed with your logic for authenticated routes
        res.json({ message: `Welcome, ${decoded.username}! You are authorized to access this route.` });
    } catch (error) {
        return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
});


// Protected Route Example page 1 - Verify JWT Token
app.get('/page1', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    try {
        // Verify the JWT token
        const decoded = jwtUtils.verifyToken(token);
        // Proceed with your logic for authenticated routes
        res.json({ message: `Welcome, ${decoded.username}! You are authorized to access this route.` });
    } catch (error) {
        return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
});

// Verify Email Route
app.post('/verify-email', async (req, res) => {
    const { username, code } = req.body;
    const params = {
        ClientId: clientId,
        Username: username,
        ConfirmationCode: code,
    };
    try {
        const data = await cognito.confirmSignUp(params).promise();
        res.json({ message: 'Email verification successful' });
    } catch (err) {
        console.error('Error confirming verification code:', err);
        res.status(400).json({ error: 'Error confirming verification code', message: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
