
const jwt = require('jsonwebtoken');

//JWT secret key
const JWT_SECRET = 'mySecretKey123';

const generateToken = (username) => {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
