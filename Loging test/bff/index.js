const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// AWS Cognito configuration
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-north-1' });

const userPoolId = 'eu-north-1_o0ylFua4N';
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

// Login Route
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
        res.json(data.AuthenticationResult);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
