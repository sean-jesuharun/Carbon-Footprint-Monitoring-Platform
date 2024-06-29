// const AWS = require('aws-sdk');

// const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-north-1' });
// const clientId = '3ls5ll0thrsndh6a7turjdqgch';

// module.exports = { cognito, clientId };

const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-north-1' });
const userPoolId = 'eu-north-1_o0ylFua4N'; // replace with your actual user pool ID
const clientId = '3ls5ll0thrsndh6a7turjdqgch'; // replace with your actual client ID

module.exports = { cognito, userPoolId, clientId };

