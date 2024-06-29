const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

// Middleware to verify token for all routes in backend.js
// router.use(verifyToken);

// Routes for different microservices
const vehicleRoutes = require('./vehicle');
const vendorRoutes = require('./vendor');
const supplyRoutes = require('./supply')
const evaluationRoutes = require('./evaluation');

// Define sub-routes
router.use('/vehicles', vehicleRoutes);
router.use('/vendors', vendorRoutes);
router.use('/supplies', supplyRoutes);
router.use('/evaluations', evaluationRoutes);

module.exports = router;
