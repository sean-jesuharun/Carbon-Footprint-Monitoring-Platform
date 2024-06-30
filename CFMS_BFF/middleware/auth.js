const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');
const { userPoolId } = require('../config/aws');

let pems;

const getPems = async () => {
    const url = `https://cognito-idp.eu-north-1.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
    const response = await axios.get(url);
    const { keys } = response.data;
    const myPems = {};
    keys.forEach((key) => {
        const pem = jwkToPem(key);
        myPems[key.kid] = pem;
    });
    return myPems;
};

const verifyToken = async (req, res, next) => {
    if (!pems) {
        pems = await getPems();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
    }

    const decodedJwt = jwt.decode(token, { complete: true });

    if (!decodedJwt) {
        return res.status(401).json({ errors: [{ message: 'Invalid token' }] });
    }

    const { kid } = decodedJwt.header;
    const pem = pems[kid];

    if (!pem) {
        return res.status(401).json({ errors: [{ message: 'Invalid token' }] });
    }

    jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ errors: [{ message: 'Unauthorized', detail: err.message }] });
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
